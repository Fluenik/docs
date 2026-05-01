import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

function LogoTitle() {
  return (
    <span className="bram-docs-logo">
      <img
        src="/images/bram_logo_black.png"
        alt=""
        className="bram-docs-logo__mark bram-docs-logo__mark--light"
      />
      <img
        src="/images/bram_logo_white.png"
        alt=""
        className="bram-docs-logo__mark bram-docs-logo__mark--dark"
      />
      <span>BRAM</span>
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <LogoTitle />,
      url: '/',
    },
    links: [
      {
        text: 'Open BRAM',
        url: 'https://app.getbram.com',
        external: true,
      },
      {
        text: 'Status',
        url: 'https://status.getbram.com',
        external: true,
      },
      {
        text: 'Changelog',
        url: 'https://getbram.com/changelog',
        external: true,
      },
      {
        text: 'Support',
        url: 'mailto:support@getbram.com',
        external: true,
      },
    ],
  };
}
