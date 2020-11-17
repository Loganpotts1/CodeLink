export default function formatDate(date) {
    return Intl.DateTimeFormat().format(new Date(date));
}