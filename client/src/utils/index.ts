type ResolveFile = Record<'fileName' | 'recordId' | 'collectionName', string>

export const resolveFile = ({
  fileName,
  recordId,
  collectionName,
}: ResolveFile) =>
  `http://127.0.0.1:8090/api/files/${collectionName}/${recordId}/${fileName}`;
