export const formatDate = (date?: string) => {
    const dateObj = date ? new Date(date) : new Date();
    return `${dateObj.getDate()}/${
      dateObj.getMonth() + 1
    }/${dateObj.getFullYear()} ${
      dateObj.getHours() < 10 ? '0' : ''
    }${dateObj.getHours()}:${
      dateObj.getMinutes() < 10 ? '0' : ''
    }${dateObj.getMinutes()}`;
  };
  