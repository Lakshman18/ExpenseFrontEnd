/* eslint-disable no-unused-vars */
export enum ACTION_STATUS {
    SUCCESS = 'Success',
    UPDATED = 'Updated',
    ERROR = 'Error',
    WARNING = 'Warning',
    LOADING = 'Loading',
}

export enum NOTIFIER_VARIANT {
    SUCCESS= 'success',
    DEFAULT = 'default',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info'
}

export const PAGINATION_SETTINGS = {
  DEFAULT_TILE_COLUMNS_PER_PAGE: 8,
  DEFAULT_TILES_PER_PAGE: 16,
  DEFAULT_ROWS_PER_PAGE: 10,
  ROWS_PER_PAGE_OPTIONS: [5, 10, 25],
  TILES_PER_PAGE_OPTIONS: [16, 32, 64]
}

export enum STYLE_MODES {
  PLM = 'plm',
  NON_PLM = 'non-plm'
}

export enum STYLE_INFO_ACTIONS {
  CREATE = 'create',
  EDIT = 'edit'
}

export enum FileUploadTypes {
 StyleImage = 1
}

export enum FILE_DROPPER_STATUS {
  SUCCESS = 'COMPLETED',
  UPLOADING = 'UPLOADING',
  FAILED = 'FAILED'
}

export enum SAMPLE_TYPES {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL'
}

export enum SAMPLE_STATUS_ID {
  ADD_TO_CART = 1,
  REQUEST_FOR_CHECKOUT = 2,
  CHECKED_OUT = 3,
  AVAILABLE_OR_CHECKED_IN = 4
}

export enum APPROVAL_STATUS_ID {
  APPROVED = 5,
  REJECTED = 6,
  PENDING = 7
}

export const CACHED_DATA_VARIABLES = {
  SAMPLE_BOOTH_FILTERS: 'cache.sampleBoothFilters',
  SAMPLE_BOOTH_IS_ADVANCE_FILTERS: 'cache.sampleBoothIsAdvanceFilters',
  STYLE_MANAGEMENT_FILTERS: 'cache.styleMgtFilters',
  STYLE_MANAGEMENT_IS_ADVANCE_FILTERS: 'cache.styleMgtIsAdvanceFilters',
  DESIGN_REPORT_GLOBAL_FILTERS: 'cache.designRptGlobalFilters',
  DESIGN_REPORT_GLOBAL_IS_ADVANCE_FILTERS: 'cache.designRptGlobalIsAdvanceFilters',
  QR_SCANNER_LASTED_USED_DEVICE: 'scanner.lastActiveDevice'
}

export enum PERMISSION_MODES {
  VIEW_PERMISSION = 1,
  ASSIGN_PERMISSION = 2
}

export enum CHECKOUT_HISTORY_ACTION_MODS {
  CHECKIN = 'CHECKIN',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  REMIND = 'REMIND'
}

export enum DESIGN_REPORT_SORT_TYPES {
  FILENAME = 'FILENAME',
  UPLOADED_DATE = 'UPLOADEDDATE',
  LIKE_COUNT = 'LIKECOUNT'
}

export enum SKETCH_LIBRARY_SORT_TYPES {
  FILENAME = 'FILENAME',
  UPLOADED_DATE = 'UPLOADEDDATE',
  LIKE_COUNT = 'LIKECOUNT',
}

export enum DESIGN_REPORT_UPLOAD_STATUS {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING'
}

export enum DESIGN_REPORT_EDIT_MODES {
  NEW_VERSION = 'New Version',
  NEW_FILE = 'New File'
}

export enum DESIGN_REPORT_UPLOAD_QUEUE_STATUS {
  UPLOADING = 'Uploading',
  COMPLETED = 'Completed',
  QUEUED = 'Queued',
  ERROR = 'Error'
}

export enum DESIGN_LIBRARY_SORT_TYPES {
  FILENAME = 'FILENAME',
  UPLOADED_DATE = 'UPLOADEDDATE',
  LIKE_COUNT = 'LIKECOUNT'
}

export enum DESIGN_REPORT_APPROVAL_STATUS_ID{
  APPROVED = 8,
  REJECTED = 9,
  PENDING = 10
}

export enum DESIGN_REPORT_APPROVAL_ACTION_MODES {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT'
}

export enum SKETCHES_UPLOAD_QUEUE_STATUS {
  UPLOADING = 'Uploading',
  COMPLETED = 'Completed',
  QUEUED = 'Queued',
  ERROR = 'Error'
}

export enum SKETCH_SHARE_TO_GLOBAL_STATUS {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export enum SKETCH_ASSIGN_TO_STYLE_STATUS {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export enum SKETCH_LIBRARY_APPROVAL_ACTION_MODES {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT'
}
