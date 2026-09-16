import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BagIcon,
  BookmarkIcon,
  CartIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  ExploreIcon,
  FilterIcon,
  GridIcon,
  HeartIcon,
  LeafIcon,
  ListIcon,
  MicIcon,
  PlusIcon,
  ReloadIcon,
  SearchIcon,
  ShopIcon,
  StarIcon,
  UserIcon,
  WishlistIcon,
} from '../../components/icons/Icons';
import { useAuthViewModel } from '../auth/useAuthViewModel';
import { useCategoriesViewModel } from './useCategoriesViewModel';
import { useProductsViewModel } from './useProductsViewModel';
import { activeFilters, type Product } from './products';
import type { ApiProduct } from '../../api/productsApi';
import { PRODUCTS_PAGE_SIZE } from './productsSlice';

function toCardProduct(item: ApiProduct): Product {
  return {
    id: String(item.id),
    title: item.title,
    subtitle: item.brand ?? item.category,
    price: `$${item.price}`,
    rating: item.rating.toFixed(1),
    reviews: `(${item.stock})`,
    badge:
      item.discountPercentage > 10
        ? { label: `${Math.round(item.discountPercentage)}% Off`, variant: 'dark' }
        : undefined,
    wishlisted: false,
    thumbnail: item.thumbnail,
  };
}

const colors = {
  ink: '#1A1C1C',
  subtle: '#46464B',
  accent: '#AB3425',
  accentSoft: '#FFDAD4',
  accentSoftText: '#410100',
  surface: '#FFFFFF',
  surfaceMuted: '#EEEEED',
  imagePlaceholder: '#F3F4F3',
  overlayWhite: '#FFFFFFE5',
  badgeDark: '#201A15',
  border: '#E2E2E2',
  headerBg: '#F9F9F8D9',
  toolbarBg: '#F9F9F8E5',
};

const HEADER_HEIGHT = 64;
const NAV_HEIGHT = 64;

function ProductCard({
  item,
  onPress,
}: {
  item: Product;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.cardImageWrap}>
        {item.thumbnail ? (
          <Image source={{ uri: item.thumbnail }} style={styles.cardImage} />
        ) : (
          <View style={styles.cardImage} />
        )}

        {item.badge ? (
          <View
            style={[
              styles.badge,
              item.badge.variant === 'dark'
                ? styles.badgeDark
                : styles.badgeLight,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                item.badge.variant === 'dark'
                  ? styles.badgeTextLight
                  : styles.badgeTextAccent,
              ]}
            >
              {item.badge.label.toUpperCase()}
            </Text>
          </View>
        ) : null}

        <Pressable
          style={styles.wishlistButton}
          hitSlop={6}
          accessibilityLabel={
            item.wishlisted ? 'Remove from wishlist' : 'Add to wishlist'
          }
        >
          <HeartIcon
            size={15}
            color={item.wishlisted ? colors.accent : colors.subtle}
          />
        </Pressable>
      </View>

      <View style={styles.cardBody}>
        <View>
          <View style={styles.ratingRow}>
            <StarIcon size={11} />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewsText}>{item.reviews}</Text>
          </View>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.cardSubtitle} numberOfLines={1}>
            {item.subtitle}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>{item.price}</Text>
          <Pressable
            style={styles.addButton}
            hitSlop={6}
            accessibilityLabel={`Add ${item.title} to bag`}
          >
            <PlusIcon size={10.5} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

function SkeletonCard() {
  const pulse = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.4,
          duration: 650,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <View style={styles.card}>
      <Animated.View
        style={[styles.cardImageWrap, styles.skeletonImage, { opacity: pulse }]}
      />
      <View style={styles.cardBody}>
        <Animated.View style={[styles.skeletonLine, styles.skeletonLineWide, { opacity: pulse }]} />
        <Animated.View style={[styles.skeletonLine, styles.skeletonLineNarrow, { opacity: pulse }]} />
        <Animated.View style={[styles.skeletonLine, styles.skeletonLinePrice, { opacity: pulse }]} />
      </View>
    </View>
  );
}

type Props = {
  onSelectProduct?: (productId: number) => void;
  onOpenCart?: () => void;
};

function HomeScreen({ onSelectProduct, onOpenCart }: Props) {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuthViewModel();
  const { categories, loadCategories } = useCategoriesViewModel();
  const {
    products: apiProducts,
    total,
    isLoading,
    isLoadingMore,
    loadProducts,
    loadMoreProducts,
  } = useProductsViewModel();
  const [query, setQuery] = useState('Ceramic vessels & warm accents');
  const [fixedHeight, setFixedHeight] = useState(HEADER_HEIGHT);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Once categories arrive, kick off the initial products fetch with the
  // first category's slug.
  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0].slug);
    }
  }, [categories, selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      loadProducts(selectedCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const products = apiProducts.map(toCardProduct);
  const showSkeleton = isLoading && products.length === 0;
  const hasMore = products.length < total;
  const percentLoaded = total > 0 ? Math.round((products.length / total) * 100) : 0;

  const rows: Product[][] = [];
  for (let i = 0; i < products.length; i += 2) {
    rows.push(products.slice(i, i + 2));
  }

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View
        style={[styles.header, { paddingTop: insets.top }]}
        onLayout={e => setFixedHeight(e.nativeEvent.layout.height)}
      >
        <View style={styles.headerRow}>
          <View style={styles.brandRow}>
            {user?.image ? (
              <Image source={{ uri: user.image }} style={styles.brandLogo} />
            ) : (
              <View style={styles.brandLogo}>
                <LeafIcon size={18} color={colors.surface} />
              </View>
            )}
            <View>
              <Text style={styles.brandEyebrow}>AURA</Text>
              <Text style={styles.brandTitle}>Shop</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <Pressable style={styles.headerIconButton} hitSlop={6}>
              <SearchIcon size={16.5} />
            </Pressable>
            <Pressable style={styles.headerIconButton} hitSlop={6}>
              <WishlistIcon size={18} />
            </Pressable>
            <Pressable style={styles.headerIconButton} hitSlop={6} onPress={onOpenCart}>
              <BagIcon size={14.5} />
              <View style={styles.headerBadge}>
                <Text style={styles.headerBadgeText}>2</Text>
              </View>
            </Pressable>
            <Pressable onPress={logout} hitSlop={6}>
              {user?.image ? (
                <Image source={{ uri: user.image }} style={styles.avatar} />
              ) : (
                <View style={styles.avatar} />
              )}
            </Pressable>
          </View>
        </View>

        {/* Search bar */}
        <View style={styles.searchBarWrap}>
          <View style={styles.searchBar}>
            <SearchIcon size={15} color={colors.subtle} />
            <TextInput
              style={styles.searchInput}
              value={query}
              onChangeText={setQuery}
              placeholder="Search curated objects"
              placeholderTextColor={colors.subtle}
            />
            {query.length > 0 ? (
              <Pressable
                style={styles.searchIconButton}
                onPress={() => setQuery('')}
                hitSlop={6}
              >
                <CloseIcon size={9.3} />
              </Pressable>
            ) : null}
            <Pressable style={styles.searchIconButton} hitSlop={6}>
              <MicIcon size={11.7} color={colors.ink} />
            </Pressable>
          </View>
        </View>

        {/* Category chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {categories.map(chip => {
            const active = chip.slug === selectedCategory;
            return (
              <Pressable
                key={chip.slug}
                onPress={() => setSelectedCategory(chip.slug)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text
                  style={[styles.chipText, active && styles.chipTextActive]}
                >
                  {chip.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: fixedHeight },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Product grid */}
        <View style={styles.grid}>
          {showSkeleton
            ? [0, 1, 2].map(rowIndex => (
                <View style={styles.gridRow} key={rowIndex}>
                  <SkeletonCard />
                  <SkeletonCard />
                </View>
              ))
            : rows.map((row, rowIndex) => (
                <View style={styles.gridRow} key={rowIndex}>
                  {row.map(item => (
                    <ProductCard
                      item={item}
                      key={item.id}
                      onPress={() => onSelectProduct?.(Number(item.id))}
                    />
                  ))}
                  {row.length === 1 ? <View style={styles.cardSpacer} /> : null}
                </View>
              ))}
        </View>

        {/* Editorial callout */}
        <View style={styles.editorial}>
          <Text style={styles.editorialEyebrow}>STUDIO SOURCING</Text>
          <Text style={styles.editorialHeading}>
            Artisanal provenance in every piece
          </Text>
          <Text style={styles.editorialBody}>
            Our ceramics and woodcraft are formed in small independent kilns
            and heritage family workshops across Kyoto, Copenhagen, and
            Oaxaca.
          </Text>
          <Pressable style={styles.editorialLink} hitSlop={4}>
            <Text style={styles.editorialLinkText}>Read Maker Notes</Text>
            <ChevronRightIcon size={10.7} />
          </Pressable>
          <View style={styles.editorialGlow} />
        </View>

        {/* Pagination / load more */}
        {!showSkeleton && total > 0 ? (
          <View style={styles.pagination}>
            <View style={styles.paginationHeader}>
              <Text style={styles.paginationLabel}>
                Showing {products.length} of {total} objects
              </Text>
              <Text style={styles.paginationPercent}>{percentLoaded}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${percentLoaded}%` }]} />
            </View>

            {hasMore ? (
              <Pressable
                style={styles.loadMoreButton}
                onPress={() => loadMoreProducts(selectedCategory)}
                disabled={isLoadingMore}
              >
                <ReloadIcon size={18.3} />
                <Text style={styles.loadMoreText}>
                  {isLoadingMore
                    ? 'Loading…'
                    : `Load Next ${Math.min(PRODUCTS_PAGE_SIZE, total - products.length)} Objects`}
                </Text>
              </Pressable>
            ) : null}

            <Text style={styles.deliveryNote}>
              Complimentary insured delivery on orders over $150
            </Text>
          </View>
        ) : null}
      </ScrollView>

      {/* Bottom nav */}
      <View style={[styles.nav, { paddingBottom: insets.bottom }]}>
        <View style={styles.navRow}>
          <View style={styles.navItem}>
            <ShopIcon size={20} color={colors.ink} />
            <Text style={[styles.navText, styles.navTextActive]}>Shop</Text>
          </View>
          <View style={styles.navItem}>
            <ExploreIcon size={20} />
            <Text style={styles.navText}>Explore</Text>
          </View>
          <View style={styles.navItem}>
            <BookmarkIcon size={14} />
            <Text style={styles.navText}>Saved</Text>
          </View>
          <Pressable style={styles.navItem} onPress={onOpenCart}>
            <View>
              <CartIcon size={16} />
              <View style={styles.navCartBadge}>
                <Text style={styles.navCartBadgeText}>2</Text>
              </View>
            </View>
            <Text style={styles.navText}>Cart</Text>
          </Pressable>
          <View style={styles.navItem}>
            <UserIcon size={16} />
            <Text style={styles.navText}>Account</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const CARD_GAP = 12;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: NAV_HEIGHT + 16,
  },

  // Header
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: colors.headerBg,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    elevation: 3,
  },
  headerRow: {
    height: HEADER_HEIGHT,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandEyebrow: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: colors.accent,
    textTransform: 'uppercase',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.18,
    color: colors.ink,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.surface,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceMuted,
  },

  // Search bar
  searchBarWrap: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  searchBar: {
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.imagePlaceholder,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.ink,
    padding: 0,
  },
  searchIconButton: {
    paddingHorizontal: 2,
  },

  // Chips
  chipsRow: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    height: 32,
    borderRadius: 9999,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
    gap: 6,
  },
  chipActive: {
    backgroundColor: colors.ink,
  },
  chipAccent: {
    backgroundColor: colors.accentSoft,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.24,
    color: colors.subtle,
  },
  chipTextActive: {
    color: colors.surface,
  },
  chipTextAccent: {
    color: colors.accentSoftText,
    fontWeight: '600',
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },

  // Toolbar
  toolbar: {
    backgroundColor: colors.toolbarBg,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
  },
  toolbarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButton: {
    height: 36,
    borderRadius: 9999,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.24,
    color: colors.ink,
  },
  filterCountBadge: {
    borderRadius: 9999,
    backgroundColor: colors.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  filterCountText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.24,
    color: colors.surface,
  },
  toolbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sortPill: {
    height: 36,
    borderRadius: 9999,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  sortLabel: {
    fontSize: 12,
    letterSpacing: 0.12,
    color: colors.subtle,
  },
  sortValue: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.24,
    color: colors.ink,
  },
  viewSwitcher: {
    height: 36,
    borderRadius: 9999,
    backgroundColor: colors.surfaceMuted,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  viewSwitcherButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewSwitcherButtonActive: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  filterTagsRow: {
    gap: 8,
    alignItems: 'center',
  },
  filterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 9999,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  filterTagText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: colors.ink,
  },
  clearAllText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: colors.accent,
    paddingHorizontal: 4,
  },

  // Grid
  grid: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  gridRow: {
    flexDirection: 'row',
    gap: CARD_GAP,
    marginBottom: 18,
  },
  cardSpacer: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: colors.surface,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  cardImageWrap: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  cardImage: {
    aspectRatio: 4 / 5,
    backgroundColor: colors.imagePlaceholder,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeLight: {
    backgroundColor: colors.overlayWhite,
  },
  badgeDark: {
    backgroundColor: colors.badgeDark,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  badgeTextAccent: {
    color: colors.accent,
  },
  badgeTextLight: {
    color: colors.surface,
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.overlayWhite,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  cardBody: {
    gap: 6,
  },
  skeletonImage: {
    aspectRatio: 4 / 5,
    backgroundColor: colors.imagePlaceholder,
  },
  skeletonLine: {
    height: 10,
    borderRadius: 4,
    backgroundColor: colors.imagePlaceholder,
  },
  skeletonLineWide: {
    width: '85%',
  },
  skeletonLineNarrow: {
    width: '55%',
  },
  skeletonLinePrice: {
    marginTop: 4,
    width: '35%',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: colors.ink,
  },
  reviewsText: {
    fontSize: 11,
    color: colors.subtle,
  },
  cardTitle: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.18,
    color: colors.ink,
  },
  cardSubtitle: {
    marginTop: 2,
    fontSize: 12,
    letterSpacing: 0.12,
    color: colors.subtle,
  },
  cardFooter: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.35,
    color: colors.ink,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },

  // Editorial
  editorial: {
    marginHorizontal: 20,
    marginTop: 8,
    padding: 20,
    borderRadius: 16,
    backgroundColor: colors.imagePlaceholder,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  editorialEyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.accent,
    textTransform: 'uppercase',
  },
  editorialHeading: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.18,
    color: colors.ink,
    maxWidth: 220,
  },
  editorialBody: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 19.5,
    letterSpacing: 0.12,
    color: colors.subtle,
    maxWidth: 220,
  },
  editorialLink: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editorialLinkText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.24,
    color: colors.ink,
  },
  editorialGlow: {
    position: 'absolute',
    right: -30,
    top: 30,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#FFDAD480',
  },

  // Pagination
  pagination: {
    marginTop: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 12,
  },
  paginationHeader: {
    width: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paginationLabel: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.6,
    color: colors.subtle,
  },
  paginationPercent: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: colors.ink,
  },
  progressTrack: {
    width: 220,
    height: 4,
    borderRadius: 9999,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  progressFill: {
    width: '12.5%',
    height: 4,
    borderRadius: 9999,
    backgroundColor: colors.accent,
  },
  loadMoreButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  loadMoreText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.14,
    color: colors.ink,
  },
  deliveryNote: {
    fontSize: 12,
    letterSpacing: 0.12,
    color: colors.subtle,
    textAlign: 'center',
  },

  // Bottom nav
  nav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.headerBg,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 12,
    elevation: 4,
  },
  navRow: {
    height: NAV_HEIGHT,
    flexDirection: 'row',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: colors.subtle,
  },
  navTextActive: {
    color: colors.ink,
  },
  navCartBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navCartBadgeText: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.surface,
  },
});

export default HomeScreen;
