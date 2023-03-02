import '../styles/globals.css'
import Layout from '../components/global/Layout'
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Auth from '../components/Auth/Session/Auth';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Auth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Auth>
    </Provider>
  )
}

export default MyApp;
