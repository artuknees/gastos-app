import Home from '../components/global/Home';
import { useAppSelector } from '../redux/hooks'

const home = () => {
  const { user } = useAppSelector(state => state.session)
  return <Home/>
}

export default home
