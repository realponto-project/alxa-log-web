import moment from 'moment'
import 'moment/locale/pt-br'

const formattedDate = (date, pattern, increment = 0) => moment(date).add(increment, 'day').format(pattern)

export default formattedDate
