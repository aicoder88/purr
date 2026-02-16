interface LocalizedMetaProps {
  structuredData?: object;
}

/**
 * @deprecated In App Router, use the Metadata API in page.tsx instead.
 * This component now renders structured data as a script tag only.
 * For metadata (title, meta tags, etc.), export a `metadata` object from your page.
 * 
 * Example:
 * export const metadata: Metadata = {
 *   title: 'Page Title',
 *   description: 'Page description',
 * };
 */
export const LocalizedMeta: React.FC<LocalizedMetaProps> = ({
  structuredData,
}) => {
  // Only render structured data - all other metadata should be handled
  // via the App Router Metadata API in server components
  if (!structuredData) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
};

export default LocalizedMeta;
