export function formatDate(isoString: string): string {
    const date = new Date(isoString);

    // Get parts of the date
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit', 
        hour12: true
    };

    // Format the date
    return date.toLocaleDateString('en-US', options);
}

