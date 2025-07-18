function getFooterContent() {
    const fullName = "Lienne Sebastian Cunanan";
    const currentDate = "July 18, 2025"; // Update this date dynamically if you want
    const sectionName = "WD-301";

    return `
        <hr />
        <footer style="font-size: 0.8em; color: #666;">
            Name: ${fullName}<br />
            Date: ${currentDate}<br />
            Section: ${sectionName}
        </footer>
    `;
}

module.exports = {
    getFooterContent
};
