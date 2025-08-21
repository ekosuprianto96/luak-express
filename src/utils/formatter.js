const formatter = (date) => (
    new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}).format(new Date(date)));

const toTitleCase = (str) => (
    str
    .replace(/_/g, ' ') // ganti _ jadi spasi
    .toLowerCase() // biar semua huruf kecil dulu
    .replace(/\b\w/g, char => char.toUpperCase()) // huruf pertama tiap kata jadi besar
);

const toPascalCase = (str) => (
    str
    .split('_') // pecah berdasarkan underscore
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // kapital setiap kata
    .join('')
);

module.exports = {
    dateFormat: formatter,
    toTitleCase,
    toPascalCase
};