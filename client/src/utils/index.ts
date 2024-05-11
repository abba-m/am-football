type ResolveFile = Record<'fileName' | 'recordId' | 'collectionName', string>

export const resolveFile = ({
  fileName,
  recordId,
  collectionName,
}: ResolveFile) =>
  `http://127.0.0.1:8090/api/files/${collectionName}/${recordId}/${fileName}`;

export const formatDate = (dateString?: string) => {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    } as const;

    const date = dateString ? new Date(dateString) : new Date();
    return date.toLocaleDateString(undefined, options);
  };
