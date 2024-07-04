const priceConverter = (number)=>{
    if (number >= 10000000) {
        // Convert the number to "crore" by dividing by 10,000,000
        let croreNumber = number / 10000000;
        return croreNumber + " Crore";
    } else if (number >= 100000) {
        // Convert the number to "lac" by dividing by 100,000
        let lacNumber = number / 100000;
        return lacNumber + " Lac";
    } else {
        return number.toString();
    }
}

export {priceConverter}