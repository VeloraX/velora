import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";
import React from 'react';
import { IconBrandFacebook } from '@tabler/icons-react';

const IconTest = () => {
  return (
    <Layout
      metaTitle={frontMatter.title}
      metaDescription={frontMatter.description}
    >
      <PageHeaderBlock title={frontMatter.title} />

      <section>
      <div>
      <h1>Icon Test</h1>
      <IconBrandFacebook size={18} />
    </div>
      </section>
    </Layout>
  );
}

export default IconTest;