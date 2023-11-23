import { Provider } from 'react-redux'; // Import the Provider component
import { wrapper } from '../redux/store/store.js'
import "tailwindcss/tailwind.css"
function MyApp ({ Component, pageProps }) {
  return (
    <Provider store={wrapper.store}> {/* Wrap the MyApp component with the Provider component */}
      <Component {...pageProps} />
    </Provider>
  )
}

export default wrapper.withRedux(MyApp)