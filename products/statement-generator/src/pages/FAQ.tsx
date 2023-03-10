import React, { Dispatch, useEffect, useState } from 'react';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { INLINES } from '@contentful/rich-text-types';

import LinkAsText from 'components/LinkAsText';
import ContentContainer from 'components-layout/ContentContainer';

function FAQ() {
  const [faqContent, setFaqContent]: [any, Dispatch<any>] = useState<any>(null);

  const cmsClient = createClient({
    space: 'uxgl7ml6f9io',
    environment: 'master',
    accessToken: 'rgDHDUhtwLQ2yejB75a6nHnov6kAgz-fgBi4zVtlhj8',
  });

  useEffect((): void => {
    cmsClient
      .getEntry('6vjxLzf5fFYUnJjOUBLuug')
      .then((entry: any) => {
        const renderOptions = {
          renderNode: {
            // Renders hyperlink elements to a LinkAsText components
            // The LinkAsText implementation only renders the href/uri, which may
            // not work as expected if contentful link includes other content.
            [INLINES.HYPERLINK]: (node: any) => {
              const {
                data: { uri },
              } = node;

              return <LinkAsText link={uri} />;
            },
          },
        };

        const nodes = documentToReactComponents(
          entry.fields.faqContent,
          renderOptions
        );

        setFaqContent(nodes);
      })
      .catch((error) => {
        // eslint-disable-next-line  no-console
        console.error(error);
      });
  }, []);

  return <ContentContainer>{faqContent}</ContentContainer>;
}

export default FAQ;
