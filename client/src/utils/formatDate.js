export default function formatDate(date, day = false) {
    const intl = Intl.DateTimeFormat("en",
        {
            month: "long",
            [day && "day"]: "numeric",
            year: "numeric"
        }
    );

    return intl.format(new Date(date));
}