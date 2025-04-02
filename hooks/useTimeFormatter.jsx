import React from 'react'
import moment from 'moment'

const useTimeFormatter = (date) => {
  const now = moment()
  const cDate = moment(date)

  if (cDate.isSame(now, 'day')) {
    return cDate.fromNow()
  } else {
    return cDate.format('hh:mm a MMMM DD, YYYY')
  }
}

export default useTimeFormatter
