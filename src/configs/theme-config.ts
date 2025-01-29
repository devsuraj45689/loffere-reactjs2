interface iThemeOptions {
  light: {
    token: { [key: string]: string | number };
  };
  dark: {
    token: { [key: string]: string | number };
  };
}

export const themeVariants: iThemeOptions = {
  light: {
    token: {
      colorPrimary: '#24989B',
      colorLink: '#1890ff',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      fontSize: 14,
      colorTextHeading: 'rgba(0, 0, 0, 0.85)',
      colorText: 'rgba(0, 0, 0, 0.65)',
      colorTextSecondary: 'rgba(0, 0, 0, 0.45)',
      colorTextDisabled: 'rgba(0, 0, 0, 0.25)',
      borderRadius: 2,
      colorBorder: '#d9d9d9',
      boxShadow:
        '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    },
  },
  dark: {
    token: {
      colorPrimary: 'black',
      colorLink: '#00b96b',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      fontSize: 14,
      colorTextHeading: 'rgba(255, 255, 255, 0.85)',
      colorText: 'rgba(255, 255, 255, 0.65)',
      colorTextSecondary: 'rgba(255, 255, 255, 0.45)',
      colorTextDisabled: 'rgba(255, 255, 255, 0.25)',
      borderRadius: 2,
      colorBorder: '#434343',
      boxShadow:
        '0 3px 6px -4px rgba(255, 255, 255, 0.12), 0 6px 16px 0 rgba(255, 255, 255, 0.08), 0 9px 28px 8px rgba(255, 255, 255, 0.05)',
    },
  },
};
