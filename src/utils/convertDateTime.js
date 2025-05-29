import React from 'react'
import { formatDistanceToNowStrict } from 'date-fns';
import { vi } from 'date-fns/locale';
const convertDateTime = (dateTime) => {
  const timeAgo = formatDistanceToNowStrict(new Date(dateTime), { locale: vi });
  return (timeAgo)
}

export default convertDateTime