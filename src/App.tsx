// @ts-nocheck
// @ts-ignore
import React from 'react';
import { ConfigProvider } from 'antd';
import { HelmetData, HelmetProvider } from 'react-helmet-async';
import deDe from 'antd/lib/locale/de_DE';
import enUS from 'antd/lib/locale/en_US';
import GlobalStyle from './styles/GlobalStyle';
import 'typeface-montserrat';
import 'typeface-lato';
import { AppRouter } from './components/router/AppRouter';
import { useLanguage } from './hooks/useLanguage';
import { useAutoNightMode } from './hooks/useAutoNightMode';
import { usePWA } from './hooks/usePWA';
import { useThemeWatcher } from './hooks/useThemeWatcher';
import { useAppSelector } from './hooks/reduxHooks';
import { themeObject } from './styles/themes/themeVariables';
import { Helmet } from 'react-helmet';

const App: React.FC = () => {
  const { language } = useLanguage();
  const theme = useAppSelector((state) => state.theme.theme);

  // usePWA();

  // useAutoNightMode();

  useThemeWatcher();

  return (
    <>

      <meta name="theme-color" content={themeObject[theme].primary} />
      <GlobalStyle />
      <HelmetProvider>
      <Helmet>
          <meta name="theme-color" content={themeObject[theme].primary} />
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </Helmet>

        <ConfigProvider locale={language === 'en' ? enUS : deDe}>
          <AppRouter />
        </ConfigProvider>
      </HelmetProvider>
    </>
  );
};

export default App;
