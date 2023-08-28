import duotone from "components/icons/duotone";

export const navigations = [
  { type: "label", label: "Admin", role: "admin" },
  { name: "Dashboard", icon: duotone.Dashboard, path: "/vendor/dashboard", role: "admin" },

  {
    name: "Products",
    icon: duotone.Products,
    children: [
      { name: "Product List", path: "/admin/products", role: "admin" },
      { name: "Create Product", path: "/admin/products/create", role: "admin" },
      { name: "Review", path: "/admin/product-reviews", role: "admin" },
    ],
    role: "admin"
  },

  {
    name: "Categories",
    icon: duotone.Accounts,
    path: "/admin/categories", 
    role: "admin"
  },

  // {
  //   name: "Brands",
  //   icon: duotone.Apps,
  //   children: [
  //     { name: "Brand List", path: "/admin/brands" },
  //     { name: "Create Brand", path: "/admin/brands/create" },
  //   ],
  // },

  {
    name: "Orders",
    icon: duotone.Order,
    children: [
      { name: "Order List", path: "/admin/orders" },
      {
        name: "Order Details",
        path: "/admin/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8",
        role: "admin"
      },
    ],
    role: "admin"
  },
  // { name: "Customers", icon: duotone.Customers, path: "/admin/customers" },
  // {
  //   name: "Refunds",
  //   icon: duotone.Refund,
  //   children: [
  //     { name: "Refund Request", path: "/admin/refund-request" },
  //     { name: "Refund Settings", path: "/admin/refund-setting" },
  //   ],
  // },
  {
    name: "Sellers",
    icon: duotone.Seller,
    children: [
      { name: "Seller List", path: "/admin/sellers", role: "admin" },
      { name: "Seller Package", path: "/admin/seller-package", role: "admin" },
      { name: "Package Payments", path: "/admin/package-payment", role: "admin" },
      { name: "Earning History", path: "/admin/earning-history", role: "admin" },
      { name: "Payouts", path: "/admin/payouts", role: "admin" },
      { name: "Payout Request", path: "/admin/payout-request", role: "admin" },
    ],
    role: "admin"
  },
  {
    name: "Warehouses",
    icon: duotone.AdminEcommerce,
    path: '/admin/warehouses', 
    role: "admin"
  },
  {
    name: "Site Setting",
    icon: duotone.SiteSetting,
    path: "/vendor/site-settings", 
    role: "admin"
  },

  { type: "label", label: "Vendor", role: "manager" },
  // {
  //   name: "Earnings",
  //   icon: duotone.ProjectChart,
  //   children: [
  //     { name: "Earning History", path: "/vendor/earning-history" },
  //     { name: "Payouts", path: "/vendor/payouts" },
  //     { name: "Payout Request", path: "/vendor/payout-requests" },
  //     { name: "Payout Settings", path: "/vendor/payout-settings" },
  //   ],
  // },

  // {
  //   name: "Refund Request",
  //   icon: duotone.Refund,
  //   path: "/vendor/refund-request",
  // },
  { name: "Reviews", icon: duotone.Review, path: "/vendor/reviews", role: "manager" },
  {
    name: "Shop Setting",
    icon: duotone.SiteSetting,
    path: "/vendor/shop-settings",
    role: "manager"
  },
  {
    name: "Support Tickets",
    icon: duotone.ElementHub,
    path: "/vendor/support-tickets",
    role: "manager"
  },
  // {
  //   name: "Account Setting",
  //   icon: duotone.AccountSetting,
  //   path: "/vendor/account-setting",
  // },
 
  { name: "Logout", icon: duotone.Session, path: "/" },
];
