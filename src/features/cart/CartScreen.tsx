import React, { useEffect, useState } from 'react';
import {
  Alert,
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
  BoxIcon,
  CardIcon,
  CartIcon,
  CheckCircleIcon,
  CloseIcon,
  ExploreIcon,
  LeafIcon,
  LockIcon,
  MinusIcon,
  PlusIcon,
  ReloadIcon,
  SearchIcon,
  ShieldCheckIcon,
  ShopIcon,
  TagIcon,
  TrashIcon,
  TruckIcon,
  UserIcon,
  WishlistIcon,
} from '../../components/icons/Icons';
import { useCartViewModel } from './useCartViewModel';
import type { CartItem } from './cartSlice';

const colors = {
  ink: '#1A1C1C',
  subtle: '#46464B',
  faint: '#76777B',
  accent: '#AB3425',
  accentSoft: '#AB342533',
  surface: '#FFFFFF',
  surfaceMuted: '#F3F4F3',
  background: '#F9F9F8',
  border: '#EEEEED',
  divider: '#E8E8E7',
  headerBg: '#F9F9F8D9',
  toolbarBg: '#F9F9F8E5',
};

const HEADER_HEIGHT = 64;
const NAV_HEIGHT = 64;
const CHECKOUT_BAR_HEIGHT = 68;

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

function StockIndicator({ item }: { item: CartItem }) {
  if (item.stockVariant === 'check') {
    return (
      <View style={styles.stockRow}>
        <CheckCircleIcon size={11} color={colors.accent} />
        <Text style={styles.stockText}>{item.stockLabel}</Text>
      </View>
    );
  }
  if (item.stockVariant === 'dot') {
    return (
      <View style={styles.stockRow}>
        <View style={styles.stockDot} />
        <Text style={styles.stockText}>{item.stockLabel}</Text>
      </View>
    );
  }
  return (
    <View style={styles.stockRow}>
      <BoxIcon size={11} color={colors.accent} />
      <Text style={styles.stockText}>{item.stockLabel}</Text>
    </View>
  );
}

function CartItemCard({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.itemRow}>
        <View style={[styles.thumb, { backgroundColor: item.swatchColor }]}>
          <View
            style={[
              styles.thumbBadge,
              item.badgeVariant === 'discount'
                ? styles.thumbBadgeDiscount
                : styles.thumbBadgeTag,
            ]}
          >
            <Text style={styles.thumbBadgeText}>{item.badgeLabel}</Text>
          </View>
        </View>

        <View style={styles.itemInfo}>
          <View style={styles.itemTitleRow}>
            <Text style={styles.itemTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Pressable
              style={styles.removeButton}
              onPress={onRemove}
              hitSlop={8}
              accessibilityLabel={`Remove ${item.title}`}
            >
              <TrashIcon size={12} color={colors.faint} />
            </Pressable>
          </View>

          <Text style={styles.itemVariant} numberOfLines={1}>
            {item.variant}
          </Text>

          <StockIndicator item={item} />

          <View style={styles.itemFooter}>
            <View style={styles.priceRow}>
              <Text style={styles.itemPrice}>{formatMoney(item.price)}</Text>
              {item.originalPrice ? (
                <Text style={styles.itemPriceOriginal}>
                  {formatMoney(item.originalPrice)}
                </Text>
              ) : null}
            </View>

            <View style={styles.stepper}>
              <Pressable
                style={styles.stepperButton}
                onPress={onDecrement}
                hitSlop={6}
                accessibilityLabel={`Decrease ${item.title} quantity`}
              >
                <MinusIcon size={9.3} color={colors.ink} />
              </Pressable>
              <Text style={styles.stepperValue}>{item.quantity}</Text>
              <Pressable
                style={styles.stepperButton}
                onPress={onIncrement}
                hitSlop={6}
                accessibilityLabel={`Increase ${item.title} quantity`}
              >
                <PlusIcon size={9.3} color={colors.ink} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

type Props = { onShopNow?: () => void };

function CartScreen({ onShopNow }: Props) {
  const insets = useSafeAreaInsets();
  const {
    items,
    promoCode,
    promoError,
    clearPromoError,
    subtotal,
    promoDiscount,
    total,
    totalQuantity,
    totalItems,
    shippingProgress,
    freeShippingUnlocked,
    installmentAmount,
    catalogTotal,
    isLoading,
    isLoadingMore,
    loadCarts,
    loadMoreCarts,
    increment,
    decrement,
    remove,
    applyPromo,
    removePromo,
  } = useCartViewModel();
  const [promoInput, setPromoInput] = useState('');

  useEffect(() => {
    loadCarts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasMoreCarts = items.length < catalogTotal;
  const percentLoaded =
    catalogTotal > 0 ? Math.round((items.length / catalogTotal) * 100) : 0;

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    applyPromo(promoInput);
  };

  const handleCheckout = () => {
    Alert.alert('Checkout', `Proceeding to checkout with ${totalQuantity} items.`);
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerRow}>
          <View style={styles.brandRow}>
            <View style={styles.brandLogo}>
              <LeafIcon size={16} color={colors.surface} />
            </View>
            <View>
              <Text style={styles.brandEyebrow}>AURA</Text>
              <Text style={styles.brandTitle}>Cart</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <Pressable style={styles.headerIconButton} hitSlop={6} accessibilityLabel="Search">
              <SearchIcon size={16.5} />
            </Pressable>
            <Pressable style={styles.headerIconButton} hitSlop={6} accessibilityLabel="Wishlist">
              <WishlistIcon size={18} />
            </Pressable>
            <Pressable style={styles.headerIconButton} hitSlop={6} accessibilityLabel="Cart">
              <CartIcon size={14.5} />
              {totalQuantity > 0 ? (
                <View style={styles.headerBadge}>
                  <Text style={styles.headerBadgeText}>{totalQuantity}</Text>
                </View>
              ) : null}
            </Pressable>
            <View style={styles.avatar} />
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: HEADER_HEIGHT + insets.top },
        ]}
      >
        {/* Free shipping tracker */}
        <View style={styles.section}>
          <View style={styles.trackerCard}>
            <View style={styles.trackerTopRow}>
              <View style={styles.trackerTitleRow}>
                <TruckIcon size={16} color={colors.accent} />
                <View>
                  <Text style={styles.trackerHeading}>My Shopping Bag</Text>
                </View>
                <Text style={styles.trackerCount}>
                  ({totalItems} items • {totalQuantity} units)
                </Text>
              </View>
              <Text style={styles.trackerStatus}>
                {freeShippingUnlocked ? 'UNLOCKED' : `${Math.round(shippingProgress * 100)}%`}
              </Text>
            </View>

            <View style={styles.trackerMessageRow}>
              <Text style={styles.trackerMessage}>
                {freeShippingUnlocked ? (
                  <>
                    <Text style={styles.trackerMessageStrong}>Free Express Delivery</Text>
                    <Text> unlocked for this order!</Text>
                  </>
                ) : (
                  <Text>
                    Spend {formatMoney(FREE_SHIPPING_REMAINING(subtotal))} more to unlock
                    free express delivery
                  </Text>
                )}
              </Text>
              <Text style={styles.trackerPercent}>
                {Math.round(shippingProgress * 100)}%
              </Text>
            </View>

            <View style={styles.trackerTrack}>
              <View
                style={[
                  styles.trackerFill,
                  { width: `${Math.round(shippingProgress * 100)}%` },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Cart items */}
        <View style={styles.section}>
          {isLoading && items.length === 0 ? (
            <Text style={styles.loadingText}>Loading cart…</Text>
          ) : (
            <View style={styles.itemsList}>
              {items.map(item => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onIncrement={() => increment(item.id)}
                  onDecrement={() => decrement(item.id)}
                  onRemove={() => remove(item.id)}
                />
              ))}
            </View>
          )}

          {!isLoading && catalogTotal > 0 ? (
            <View style={styles.pagination}>
              <View style={styles.paginationHeader}>
                <Text style={styles.paginationLabel}>
                  Showing {items.length} of {catalogTotal} products
                </Text>
                <Text style={styles.paginationPercent}>{percentLoaded}%</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${percentLoaded}%` }]} />
              </View>

              {hasMoreCarts ? (
                <Pressable
                  style={styles.loadMoreButton}
                  onPress={loadMoreCarts}
                  disabled={isLoadingMore}
                >
                  <ReloadIcon size={16} color={colors.ink} />
                  <Text style={styles.loadMoreText}>
                    {isLoadingMore ? 'Loading…' : 'Load More'}
                  </Text>
                </Pressable>
              ) : null}
            </View>
          ) : null}
        </View>

        {/* Express checkout */}
        <View style={styles.section}>
          <View style={styles.expressDividerRow}>
            <View style={styles.expressDivider} />
            <Text style={styles.expressLabel}>EXPRESS CHECKOUT</Text>
            <View style={styles.expressDivider} />
          </View>
          <View style={styles.expressButtonsRow}>
            <Pressable style={styles.applePayButton} accessibilityLabel="Pay with Apple Pay">
              <CardIcon size={13} color={colors.surface} />
              <Text style={styles.applePayText}>Apple Pay</Text>
            </Pressable>
            <Pressable style={styles.gPayButton} accessibilityLabel="Pay with Google Pay">
              <CardIcon size={13} color={colors.ink} />
              <Text style={styles.gPayText}>G Pay</Text>
            </Pressable>
          </View>
        </View>

        {/* Promo code */}
        <View style={styles.section}>
          <View style={styles.card}>
            <View style={styles.promoLabelRow}>
              <TagIcon size={14} color={colors.accent} />
              <Text style={styles.promoLabel}>Promo Code or Gift Card</Text>
            </View>

            <View style={styles.promoInputRow}>
              <TextInput
                style={styles.promoInput}
                value={promoInput}
                onChangeText={text => {
                  setPromoInput(text);
                  clearPromoError();
                }}
                placeholder="Enter voucher or promo code"
                placeholderTextColor={colors.faint}
                autoCapitalize="characters"
              />
              <Pressable style={styles.promoApplyButton} onPress={handleApplyPromo}>
                <Text style={styles.promoApplyText}>Apply</Text>
              </Pressable>
            </View>

            {promoError ? <Text style={styles.promoErrorText}>{promoError}</Text> : null}

            {promoCode ? (
              <View style={styles.activePromoTag}>
                <View style={styles.activePromoLeft}>
                  <CheckCircleIcon size={13} color={colors.accent} />
                  <Text style={styles.activePromoCode}>{promoCode}</Text>
                  <Text style={styles.activePromoAmount}>
                    (-{formatMoney(promoDiscount)})
                  </Text>
                </View>
                <Pressable
                  style={styles.activePromoRemove}
                  onPress={removePromo}
                  hitSlop={8}
                  accessibilityLabel="Remove promo code"
                >
                  <CloseIcon size={9.3} color={colors.faint} />
                </Pressable>
              </View>
            ) : null}
          </View>
        </View>

        {/* Order summary */}
        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.summaryHeading}>Order Summary</Text>

            <View style={styles.summaryRows}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{formatMoney(subtotal)}</Text>
              </View>

              {promoCode ? (
                <View style={styles.summaryRow}>
                  <View style={styles.summaryLabelRow}>
                    <Text style={styles.summarySavingsLabel}>Cart Savings / Promo</Text>
                    <View style={styles.summaryPromoBadge}>
                      <Text style={styles.summaryPromoBadgeText}>{promoCode}</Text>
                    </View>
                  </View>
                  <Text style={styles.summarySavingsValue}>
                    -{formatMoney(promoDiscount)}
                  </Text>
                </View>
              ) : null}

              <View style={styles.summaryRow}>
                <View style={styles.summaryLabelRow}>
                  <Text style={styles.summaryLabel}>Estimated Shipping</Text>
                  <Text style={styles.summarySubLabel}>(2-3 days)</Text>
                </View>
                <Text style={styles.summaryFree}>
                  {freeShippingUnlocked ? 'FREE' : formatMoney(9.99)}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Estimated Taxes</Text>
                <Text style={styles.summaryValue}>Included</Text>
              </View>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.totalRow}>
              <View>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalSubtext}>Including VAT and localized duties</Text>
              </View>
              <Text style={styles.totalValue}>{formatMoney(total)}</Text>
            </View>

            <View style={styles.installmentCallout}>
              <CardIcon size={15} color={colors.accent} />
              <Text style={styles.installmentText}>
                Or 4 interest-free payments of{' '}
                <Text style={styles.installmentAmount}>
                  {formatMoney(installmentAmount)}
                </Text>{' '}
                with <Text style={styles.installmentBrand}>Klarna</Text> or{' '}
                <Text style={styles.installmentBrand}>Afterpay</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Trust badges */}
        <View style={styles.section}>
          <View style={styles.trustRow}>
            <View style={styles.trustCard}>
              <ShieldCheckIcon size={17} color={colors.accent} />
              <Text style={styles.trustTitle}>Official{'\n'}Guarantee</Text>
              <Text style={styles.trustSubtitle}>100% Authentic</Text>
            </View>
            <View style={styles.trustCard}>
              <LockIcon size={13} color={colors.accent} />
              <Text style={styles.trustTitle}>256-Bit SSL</Text>
              <Text style={styles.trustSubtitle}>Secure checkout</Text>
            </View>
            <View style={styles.trustCard}>
              <ReloadIcon size={16} color={colors.accent} />
              <Text style={styles.trustTitle}>30-Day Return</Text>
              <Text style={styles.trustSubtitle}>Hassle-free swap</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky checkout bar */}
      <View
        style={[
          styles.checkoutBar,
          { bottom: NAV_HEIGHT + insets.bottom },
        ]}
      >
        <View>
          <Text style={styles.checkoutTotalLabel}>ORDER TOTAL</Text>
          <Text style={styles.checkoutTotalValue}>{formatMoney(total)}</Text>
        </View>
        <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>
            Proceed to Checkout ({totalQuantity} items)
          </Text>
        </Pressable>
      </View>

      {/* Bottom nav */}
      <View style={[styles.nav, { paddingBottom: insets.bottom }]}>
        <View style={styles.navRow}>
          <Pressable style={styles.navItem} onPress={onShopNow}>
            <ShopIcon size={18} color={colors.subtle} />
            <Text style={styles.navText}>Shop</Text>
          </Pressable>
          <View style={styles.navItem}>
            <ExploreIcon size={18} color={colors.subtle} />
            <Text style={styles.navText}>Explore</Text>
          </View>
          <View style={styles.navItem}>
            <BookmarkIcon size={13} color={colors.subtle} />
            <Text style={styles.navText}>Saved</Text>
          </View>
          <View style={styles.navItem}>
            <View>
              <BagIcon size={14} color={colors.ink} />
              {totalQuantity > 0 ? (
                <View style={styles.navCartBadge}>
                  <Text style={styles.navCartBadgeText}>{totalQuantity}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.navText, styles.navTextActive]}>Cart</Text>
          </View>
          <View style={styles.navItem}>
            <UserIcon size={14} color={colors.subtle} />
            <Text style={styles.navText}>Account</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function FREE_SHIPPING_REMAINING(subtotal: number) {
  return Math.max(0, 150 - subtotal);
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: NAV_HEIGHT + CHECKOUT_BAR_HEIGHT + 24,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 8,
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

  // Shipping tracker
  trackerCard: {
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
  trackerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trackerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  trackerHeading: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.18,
    color: colors.ink,
  },
  trackerCount: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.24,
    color: colors.subtle,
  },
  trackerStatus: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.accent,
    textTransform: 'uppercase',
  },
  trackerMessageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trackerMessage: {
    flex: 1,
    fontSize: 12,
    letterSpacing: 0.12,
    color: colors.subtle,
  },
  trackerMessageStrong: {
    fontWeight: '600',
    color: colors.accent,
  },
  trackerPercent: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: colors.accent,
  },
  trackerTrack: {
    height: 8,
    borderRadius: 9999,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  trackerFill: {
    height: 8,
    borderRadius: 9999,
    backgroundColor: colors.accent,
  },

  // Cart items
  itemsList: {
    gap: 16,
  },
  loadingText: {
    paddingVertical: 24,
    textAlign: 'center',
    fontSize: 12,
    color: colors.subtle,
  },
  pagination: {
    marginTop: 16,
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
  card: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  itemRow: {
    flexDirection: 'row',
    gap: 16,
  },
  thumb: {
    width: 96,
    height: 112,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    borderRadius: 9999,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  thumbBadgeDiscount: {
    backgroundColor: colors.accent,
  },
  thumbBadgeTag: {
    backgroundColor: '#1A1C1CCC',
  },
  thumbBadgeText: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.surface,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  itemTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.18,
    color: colors.ink,
  },
  removeButton: {
    padding: 4,
  },
  itemVariant: {
    marginTop: 2,
    fontSize: 12,
    letterSpacing: 0.12,
    color: colors.subtle,
  },
  stockRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  stockText: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.6,
    color: colors.accent,
  },
  itemFooter: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.18,
    color: colors.ink,
  },
  itemPriceOriginal: {
    fontSize: 12,
    color: colors.faint,
    textDecorationLine: 'line-through',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 2,
    backgroundColor: colors.surfaceMuted,
  },
  stepperButton: {
    width: 28,
    height: 28,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: {
    minWidth: 28,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.24,
    color: colors.ink,
  },

  // Express checkout
  expressDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  expressDivider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  expressLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: colors.faint,
    textTransform: 'uppercase',
  },
  expressButtonsRow: {
    marginTop: 4,
    flexDirection: 'row',
    gap: 8,
  },
  applePayButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.ink,
  },
  applePayText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.24,
    color: colors.surface,
  },
  gPayButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  gPayText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.24,
    color: colors.ink,
  },

  // Promo
  promoLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  promoLabel: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.14,
    color: colors.ink,
  },
  promoInputRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  promoInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 14,
    color: colors.ink,
    backgroundColor: colors.surfaceMuted,
  },
  promoApplyButton: {
    height: 36,
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ink,
  },
  promoApplyText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.24,
    color: colors.surface,
  },
  promoErrorText: {
    marginTop: 8,
    fontSize: 11,
    color: colors.accent,
  },
  activePromoTag: {
    marginTop: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceMuted,
  },
  activePromoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  activePromoCode: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.ink,
    textTransform: 'uppercase',
  },
  activePromoAmount: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: colors.accent,
  },
  activePromoRemove: {
    padding: 4,
  },

  // Order summary
  summaryHeading: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.18,
    color: colors.ink,
  },
  summaryRows: {
    marginTop: 12,
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  summaryLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.subtle,
  },
  summarySubLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: '#46464BB2',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.ink,
  },
  summarySavingsLabel: {
    fontSize: 14,
    color: colors.accent,
  },
  summarySavingsValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.accent,
  },
  summaryPromoBadge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: colors.accentSoft,
  },
  summaryPromoBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
    color: colors.accent,
    textTransform: 'uppercase',
  },
  summaryFree: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: colors.accent,
    textTransform: 'uppercase',
  },
  summaryDivider: {
    marginVertical: 12,
    height: 1,
    backgroundColor: colors.border,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.33,
    color: colors.ink,
  },
  totalSubtext: {
    marginTop: 4,
    fontSize: 12,
    letterSpacing: 0.12,
    color: colors.faint,
    maxWidth: 155,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.8,
    color: colors.ink,
  },
  installmentCallout: {
    marginTop: 16,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceMuted,
  },
  installmentText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.12,
    color: colors.subtle,
  },
  installmentAmount: {
    fontWeight: '600',
    color: colors.ink,
  },
  installmentBrand: {
    fontWeight: '500',
    color: colors.ink,
  },

  // Trust badges
  trustRow: {
    flexDirection: 'row',
    gap: 4,
  },
  trustCard: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  trustTitle: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: colors.ink,
    textAlign: 'center',
  },
  trustSubtitle: {
    fontSize: 10,
    color: colors.faint,
    textAlign: 'center',
  },

  // Sticky checkout bar
  checkoutBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: CHECKOUT_BAR_HEIGHT,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.toolbarBg,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 16,
    elevation: 4,
  },
  checkoutTotalLabel: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: colors.faint,
    textTransform: 'uppercase',
  },
  checkoutTotalValue: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.33,
    color: colors.ink,
  },
  checkoutButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 3,
  },
  checkoutButtonText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.14,
    color: colors.surface,
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
    minWidth: 14,
    height: 14,
    borderRadius: 7,
    paddingHorizontal: 2,
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

export default CartScreen;
