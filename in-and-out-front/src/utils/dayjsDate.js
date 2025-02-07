import dayjs from 'dayjs';

export const formatDateTime = (dateString) => {
  return dayjs(dateString).format('YYYY-MM-DD HH:mm');
};
export const formatDate = (dateString) => {
  return dayjs(dateString).format('YYYY-MM-DD');
};
