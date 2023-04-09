export const APP_ROUTES = {
  ROOT: '/',
  EXPLORE: '/explore',
  QR_SCANNER: '/qr-scanner',
  NAVIGATOR: '/navigator',
  NOTIFICATIONS: '/notifications',
  // Design Library
  DESIGN_LIBRARY: '/design-library',
  STYLE_MANAGEMENT: '/design-library/style-management',
  CREATE_STYLE: '/design-library/style-management/:actionParam/:styleModeParam',
  UPDATE_STYLE: '/design-library/style-management/:actionParam/:styleModeParam/:productIdParam',
  // Design Reports
  DESIGN_REPORTS_PERSONAL: '/design-reports/personal',
  DESIGN_REPORTS_GLOBAL: '/design-reports/global',
  DESIGN_REPORTS_APPROVAL: '/design-reports/approval-list',
  // Sample booth
  SAMPLE_BOOTH: '/sample-booth',
  SAMPLE_INFO: '/sample-booth/info/:encSampleIdParam/:sampleNoParam',
  SAMPLE_BRIEF: '/sample-booth/brief/:sampleRefNo',
  CHECKOUT_HISTORY: '/sample-booth/checkout-history',
  // User management
  USER_MANAGEMENT: '/user-management',
  ROLE_MANAGEMENT: '/user-management/role-management',
  MAP_ROLE_TASK: '/user-management/map-role-task',
  CREATE_SAMPLE: '/sample-booth/manage/:actionParam',
  UPDATE_SAMPLE: '/sample-booth/manage/:actionParam/:encSampleIdParam/:sampleNoParam',
  VIEW_PERMISSION: '/user-management/view-user-permission',
  ASSIGN_PERMISSION: '/user-management/assign-user-permission',
  RM_LIBRARY: '/rm-library',
  RMINFO: '/rm-library/rm-info/:rmIdParam',
  DESIGN_LIBRARY_GLOBAL: '/design-library/global',
  // Sketch Library
  SKETCH_LIBRARY_PERSONAL: '/sketch-library/personal',
  SKETCH_LIBRARY_GLOBAL: '/sketch-library/global',
  SKETCH_LIBRARY_APPROVAL: '/sketch-library/approval-list',
  // Master Data
  PRODUCT_TYPE_MASTER: '/master-data/product-type'
}
