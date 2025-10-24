export enum MongoErrorCode {
  DUPLICATE_KEY = 11000,
  DUPLICATE_KEY_UPDATE = 11001,
  DOCUMENT_VALIDATION_FAILURE = 121,
  UNAUTHORIZED = 13,
  AUTHENTICATION_FAILED = 18,
  ILLEGAL_OPERATION = 20,
  NAMESPACE_NOT_FOUND = 26,
  INDEX_NOT_FOUND = 27,
  INDEX_KEY_SPECIFICATIONS_CONFLICT = 86,
  CANNOT_CREATE_INDEX = 67,
  INDEX_ALREADY_EXISTS = 85,
  OPERATION_FAILED = 96,
  INTERRUPTED = 11601,
  IMMUTABLE_FIELD = 66,
  CANNOT_CONVERT_TYPE = 14,
  DOCUMENT_TOO_LARGE = 10334,
}

export const MongoErrorMessages: Record<MongoErrorCode, string> = {
  [MongoErrorCode.DUPLICATE_KEY]: 'Record already exists in the database',
  [MongoErrorCode.DUPLICATE_KEY_UPDATE]: 'Duplicate key on update',
  [MongoErrorCode.DOCUMENT_VALIDATION_FAILURE]:
    'Document does not meet validation rules',
  [MongoErrorCode.UNAUTHORIZED]: 'Not authorized to perform this operation',
  [MongoErrorCode.AUTHENTICATION_FAILED]: 'MongoDB authentication failed',
  [MongoErrorCode.ILLEGAL_OPERATION]: 'Operation not allowed',
  [MongoErrorCode.NAMESPACE_NOT_FOUND]: 'Collection or database not found',
  [MongoErrorCode.INDEX_NOT_FOUND]: 'Index not found',
  [MongoErrorCode.INDEX_KEY_SPECIFICATIONS_CONFLICT]:
    'Conflict in index key specifications',
  [MongoErrorCode.CANNOT_CREATE_INDEX]: 'Cannot create index',
  [MongoErrorCode.INDEX_ALREADY_EXISTS]: 'Index already exists',
  [MongoErrorCode.OPERATION_FAILED]: 'Operation failed',
  [MongoErrorCode.INTERRUPTED]: 'Operation interrupted',
  [MongoErrorCode.IMMUTABLE_FIELD]: 'Cannot modify an immutable field',
  [MongoErrorCode.CANNOT_CONVERT_TYPE]: 'Cannot convert data type',
  [MongoErrorCode.DOCUMENT_TOO_LARGE]: 'Document exceeds maximum allowed size',
};
