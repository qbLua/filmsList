const errorMessages = () => {
    const title = document.getElementsByName('title')[0];
    const year = document.getElementsByName('year')[0];
    const yearValue = year + 'T00:00:00';
    const author = document.getElementsByName('author')[0];
    const duration = document.getElementsByName('duration')[0];
    const rating = document.getElementsByName('rating')[0];

    if (title.value.trim().length === 0) {
        title.style.border = '3px solid red'
    } else {
        title.style.border = ''
    }

    if (new Date(yearValue) > (new Date() - 86400000) || year.value === '') {
        year.style.border = '3px solid red'
    } else {
        year.style.border = '';
    }

    if (author.value.trim().length === 0) {
        author.style.border = '3px solid red'
    } else {
        author.style.border = ''
    }

    if (duration.value === '00:00' || duration.value === '') {
        duration.style.border = '3px solid red'
    } else {
        duration.style.border = ''
    }


    if (((rating.value+'').trim().length === 1 && (rating.value+'').trim().match(/[1-9]/)) || rating.value.trim() === '10') {
        rating.style.border = ''
    } else {
        rating.style.border = '3px solid red'
    }
}

export default errorMessages;