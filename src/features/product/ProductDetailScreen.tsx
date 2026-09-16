import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  CartIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  HeartOutlineIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
  ShareIcon,
  ShieldCheckIcon,
  StarIcon,
} from '../../components/icons/Icons';
import { useProductDetailViewModel } from './useProductDetailViewModel';
import type { ApiReview } from '../../api/productsApi';
import { addToCart } from '../../api/cartsApi';

const colors = {
  ink: '#1A1C1C',
  subtle: '#46464B',
  faint: '#76777B',
  accent: '#AB3425',
  accentSoft: '#FFDAD4',
  accentSoftText: '#6D0300',
  warningBg: '#FFDAD480',
  warningText: '#8A1C10',
  surface: '#FFFFFF',
  surfaceMuted: '#EEEEED',
  imagePlaceholder: '#E8E8E7',
  overlayWhite: '#F9F9F8D9',
  pillOverlay: '#F9F9F8E5',
  border: '#EEEEED',
  dotInactive: '#C7C6CB',
  low: '#F59E0B',
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function initialsFor(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('');
}

function RatingStars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map(i => (
        <StarIcon
          key={i}
          size={size}
          color={i <= Math.round(rating) ? colors.accent : colors.dotInactive}
        />
      ))}
    </View>
  );
}

function ReviewCard({ review }: { review: ApiReview }) {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeaderRow}>
        <View style={styles.reviewAuthorRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initialsFor(review.reviewerName)}</Text>
          </View>
          <View>
            <Text style={styles.reviewName}>{review.reviewerName}</Text>
            <Text style={styles.reviewDate}>{formatDate(review.date)}</Text>
          </View>
        </View>
        <RatingStars rating={review.rating} />
      </View>
      <Text style={styles.reviewQuote}>“{review.comment}”</Text>
    </View>
  );
}

type Props = { productId: number; onBack?: () => void };

function ProductDetailScreen({ productId, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const { product, isLoading, error, loadProduct, clearProduct } =
    useProductDetailViewModel();
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadProduct(productId);
    return () => {
      clearProduct();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    if (product) {
      setQuantity(Math.max(1, product.minimumOrderQuantity || 1));
    }
  }, [product]);

  const handleGalleryScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const width = e.nativeEvent.layoutMeasurement.width;
    if (!width) return;
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setGalleryIndex(index);
  };

  const handleAddToCart = async () => {
    if (adding) return;
    setAdding(true);
    try {
      await addToCart({
        userId: 1,
        products: [
          { id: 144, quantity: 4 },
          { id: 98, quantity: 1 },
        ],
      });
      Alert.alert('Added to cart', 'Your item has been added to the cart.');
    } catch {
      Alert.alert('Failed to add to cart', 'Please try again.');
    } finally {
      setAdding(false);
    }
  };

  if (isLoading || !product) {
    return (
      <View style={[styles.screen, styles.centered]}>
        {error ? (
          <>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable
              style={styles.retryButton}
              onPress={() => loadProduct(productId)}
            >
              <Text style={styles.retryText}>Try again</Text>
            </Pressable>
          </>
        ) : (
          <ActivityIndicator color={colors.accent} />
        )}
        <Pressable style={styles.backFallback} onPress={onBack} hitSlop={8}>
          <ArrowLeftIcon size={16} color={colors.ink} />
          <Text style={styles.backFallbackText}>Back</Text>
        </Pressable>
      </View>
    );
  }

  const images = product.images.length > 0 ? product.images : [product.thumbnail];
  const hasDiscount = product.discountPercentage > 0;
  const originalPrice = hasDiscount
    ? product.price / (1 - product.discountPercentage / 100)
    : product.price;
  const accordions = [
    { id: 'specs', title: 'Product Specifications', body: `SKU ${product.sku} • Brand ${product.brand ?? '—'} • Category ${product.category}` },
    { id: 'shipping', title: 'Shipping & Returns', body: `${product.shippingInformation}. ${product.returnPolicy}.` },
    { id: 'warranty', title: 'Warranty', body: product.warrantyInformation },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
      >
        {/* Gallery */}
        <View style={styles.gallery}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleGalleryScroll}
            scrollEventThrottle={16}
          >
            {images.map((uri, i) => (
              <Image key={i} source={{ uri }} style={styles.galleryImage} />
            ))}
          </ScrollView>

          <View style={[styles.topRow, { top: insets.top + 16 }]}>
            <View style={styles.topRowLeft}>
              <Pressable
                style={styles.circleButton}
                onPress={onBack}
                hitSlop={6}
                accessibilityLabel="Back"
              >
                <ArrowLeftIcon size={16} color={colors.ink} />
              </Pressable>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{product.category}</Text>
              </View>
            </View>
            <View style={styles.topRowRight}>
              <Pressable
                style={styles.circleButton}
                onPress={() => setWishlisted(w => !w)}
                hitSlop={6}
                accessibilityLabel={
                  wishlisted ? 'Remove from wishlist' : 'Save to wishlist'
                }
              >
                <HeartOutlineIcon
                  size={16}
                  color={wishlisted ? colors.accent : colors.ink}
                />
              </Pressable>
              <Pressable
                style={styles.circleButton}
                hitSlop={6}
                accessibilityLabel="Share"
              >
                <ShareIcon size={15} color={colors.ink} />
              </Pressable>
            </View>
          </View>

          {images.length > 1 ? (
            <View style={styles.galleryFooter}>
              <View style={styles.dots}>
                {images.map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      i === galleryIndex ? styles.dotActive : styles.dotInactiveStyle,
                    ]}
                  />
                ))}
              </View>
            </View>
          ) : null}
        </View>

        {/* Product info stack */}
        <View style={styles.infoStack}>
          <View style={styles.titleBlock}>
            <View style={styles.eyebrowRow}>
              <Text style={styles.eyebrow}>
                {[product.brand, product.category].filter(Boolean).join(' • ').toUpperCase()}
              </Text>
              <View style={styles.skuBadge}>
                <Text style={styles.skuText}>SKU: {product.sku}</Text>
              </View>
            </View>
            <Text style={styles.title}>{product.title}</Text>

            <View style={styles.priceRow}>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              {hasDiscount ? (
                <>
                  <Text style={styles.priceOriginal}>
                    ${originalPrice.toFixed(2)}
                  </Text>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>
                      {product.discountPercentage.toFixed(2)}% OFF
                    </Text>
                  </View>
                </>
              ) : null}
            </View>

            <View style={styles.policyPill}>
              <ShieldCheckIcon size={10} color={colors.accent} />
              <Text style={styles.policyText}>
                {product.returnPolicy} • {product.warrantyInformation}
              </Text>
            </View>
          </View>

          <View style={styles.ratingCard}>
            <StarIcon size={15} color={colors.accent} />
            <Text style={styles.ratingValue}>{product.rating.toFixed(2)}</Text>
            <View style={styles.ratingDot} />
            <Text style={styles.ratingReviews}>
              Based on {product.reviews.length} customer reviews
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.description}>{product.description}</Text>
            {product.tags.length > 0 ? (
              <View style={styles.highlightsGrid}>
                {product.tags.map(tag => (
                  <View style={styles.highlightItem} key={tag}>
                    <CheckCircleIcon size={15} color={colors.accent} />
                    <Text style={styles.highlightText}>{tag.toUpperCase()}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>

          <View style={styles.card}>
            <View style={styles.stockRow}>
              <View style={styles.stockRowLeft}>
                <View style={styles.stockDot} />
                <View>
                  <Text style={styles.stockTitle}>
                    {product.availabilityStatus} (Only {product.stock} left in stock)
                  </Text>
                  <Text style={styles.stockSubtitle}>{product.shippingInformation}</Text>
                </View>
              </View>
              <View style={styles.stepper}>
                <Pressable
                  style={styles.stepperButton}
                  onPress={() =>
                    setQuantity(q =>
                      Math.max(product.minimumOrderQuantity || 1, q - 1),
                    )
                  }
                  hitSlop={6}
                  accessibilityLabel="Decrease quantity"
                >
                  <MinusIcon size={11} color={colors.ink} />
                </Pressable>
                <Text style={styles.stepperValue}>{quantity}</Text>
                <Pressable
                  style={styles.stepperButton}
                  onPress={() => setQuantity(q => q + 1)}
                  hitSlop={6}
                  accessibilityLabel="Increase quantity"
                >
                  <PlusIcon size={9.3} color={colors.ink} />
                </Pressable>
              </View>
            </View>

            {product.minimumOrderQuantity > 1 ? (
              <View style={styles.warningBanner}>
                <InfoIcon size={15} color={colors.warningText} />
                <Text style={styles.warningText}>
                  Minimum order quantity: {product.minimumOrderQuantity} units required
                </Text>
              </View>
            ) : null}
          </View>

          <View style={styles.accordionGroup}>
            {accordions.map(item => {
              const isOpen = !!expanded[item.id];
              return (
                <View style={styles.card} key={item.id}>
                  <Pressable
                    style={styles.accordionHeader}
                    onPress={() =>
                      setExpanded(prev => ({ ...prev, [item.id]: !prev[item.id] }))
                    }
                  >
                    <Text style={styles.accordionTitle}>{item.title}</Text>
                    <View style={isOpen && styles.chevronFlipped}>
                      <ChevronDownIcon size={10} color={colors.subtle} />
                    </View>
                  </Pressable>
                  {isOpen ? (
                    <Text style={styles.accordionBody}>{item.body}</Text>
                  ) : null}
                </View>
              );
            })}
          </View>
        </View>

        {/* Reviews */}
        {product.reviews.length > 0 ? (
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <View>
                <Text style={styles.sectionHeading}>
                  Customer Reviews ({product.reviews.length})
                </Text>
                <View style={styles.reviewsSummaryRow}>
                  <RatingStars rating={product.rating} />
                  <Text style={styles.reviewsSummaryText}>
                    {product.rating.toFixed(2)} out of 5
                  </Text>
                </View>
              </View>
            </View>

            {product.reviews.map((review, index) => (
              <ReviewCard review={review} key={`${review.reviewerEmail}-${review.date}-${index}`} />
            ))}
          </View>
        ) : null}

      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          disabled={adding}
        >
          {adding ? (
            <ActivityIndicator size="small" color={colors.surface} />
          ) : (
            <CartIcon size={16} color={colors.surface} />
          )}
          <Text style={styles.addToCartText}>
            {adding ? 'Adding…' : `Add to Cart • $${(product.price * quantity).toFixed(2)}`}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.imagePlaceholder,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 14,
    color: colors.subtle,
    textAlign: 'center',
  },
  retryButton: {
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.ink,
  },
  retryText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.surface,
  },
  backFallback: {
    position: 'absolute',
    top: 56,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backFallbackText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.ink,
  },

  // Gallery
  gallery: {
    height: 487.5,
  },
  galleryImage: {
    width: 390,
    height: 487.5,
    backgroundColor: colors.imagePlaceholder,
  },
  topRow: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.overlayWhite,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  categoryBadge: {
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.pillOverlay,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    color: colors.accent,
    textTransform: 'uppercase',
  },
  galleryFooter: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.pillOverlay,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 16,
    backgroundColor: colors.ink,
  },
  dotInactiveStyle: {
    backgroundColor: colors.dotInactive,
  },

  // Info stack
  infoStack: {
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 20,
  },
  titleBlock: {
    gap: 6,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: {
    flex: 1,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    color: colors.subtle,
    textTransform: 'uppercase',
  },
  skuBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: colors.imagePlaceholder,
  },
  skuText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.subtle,
  },
  title: {
    marginTop: 6,
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.56,
    color: colors.ink,
  },
  priceRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.8,
    color: colors.ink,
  },
  priceOriginal: {
    fontSize: 14,
    color: colors.subtle,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: colors.accentSoft,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: colors.accentSoftText,
  },
  policyPill: {
    marginTop: 8,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.imagePlaceholder,
  },
  policyText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.24,
    color: colors.subtle,
  },

  ratingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.14,
    color: colors.ink,
  },
  ratingDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.dotInactive,
  },
  ratingReviews: {
    flex: 1,
    fontSize: 12,
    letterSpacing: 0.12,
    color: colors.subtle,
  },

  card: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 22.75,
    color: colors.ink,
  },
  highlightsGrid: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
  },
  highlightItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  highlightText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: colors.ink,
  },

  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stockRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
  },
  stockDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.low,
  },
  stockTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.24,
    color: colors.ink,
  },
  stockSubtitle: {
    marginTop: 2,
    fontSize: 12,
    letterSpacing: 0.12,
    color: colors.subtle,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9999,
    padding: 4,
    backgroundColor: colors.imagePlaceholder,
  },
  stepperButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: {
    minWidth: 32,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.14,
    color: colors.ink,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.warningBg,
  },
  warningText: {
    flex: 1,
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.6,
    color: colors.warningText,
  },

  accordionGroup: {
    gap: 8,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accordionTitle: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.14,
    color: colors.ink,
  },
  chevronFlipped: {
    transform: [{ rotate: '180deg' }],
  },
  accordionBody: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.12,
    color: colors.subtle,
  },

  // Reviews
  reviewsSection: {
    marginTop: 32,
    paddingHorizontal: 20,
    gap: 12,
    backgroundColor: colors.surfaceMuted,
    paddingBottom: 4,
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.18,
    color: colors.ink,
  },
  reviewsSummaryRow: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reviewsSummaryText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: colors.ink,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 1,
  },
  reviewCard: {
    borderRadius: 12,
    padding: 16,
    gap: 8,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.imagePlaceholder,
  },
  avatarText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: colors.subtle,
  },
  reviewName: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.24,
    color: colors.ink,
  },
  reviewDate: {
    marginTop: 2,
    fontSize: 12,
    letterSpacing: 0.12,
    color: colors.subtle,
  },
  reviewQuote: {
    fontSize: 14,
    lineHeight: 22.75,
    color: colors.ink,
  },

  // Bottom bar
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 9999,
    paddingVertical: 14,
    backgroundColor: colors.accent,
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.14,
    color: colors.surface,
  },
});

export default ProductDetailScreen;
