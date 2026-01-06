export default function formatDate(dateString) {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
    }).format(date).replace(/ (\d{2})$/, " '$1");
};