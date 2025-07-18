const http = require('http');
const url = require('url');

let homeModule, aboutModule, contactModule, galleryModule, notFoundModule, footerModule;

try {
    homeModule = require('./modules/root_module');
    aboutModule = require('./modules/about_module');
    contactModule = require('./modules/contact_module');
    galleryModule = require('./modules/gallery_module');
    notFoundModule = require('./modules/not_found_module');
    footerModule = require('./modules/footer_module');
} catch (error) {
    console.error("Error loading modules:", error);
    process.exit(1);
}

const PORT = 3000;

const server = http.createServer((request, response) => {
    console.log(`Incoming request for: ${request.url}`);

    const parsedUrl = url.parse(request.url, true);
    // Normalize path: remove trailing slash except if it's just "/"
    const route = parsedUrl.pathname.replace(/\/+$/, '') || '/';

    let contentHTML = '';
    let pageTitle = '';
    let responseCode = 200;

    const visitorName = "John Smith";

    switch (route) {
        case '/':
            pageTitle = 'Welcome to my Node.js Application';
            contentHTML = `<h1>${pageTitle}</h1><p>${homeModule.getRootContent(visitorName)}</p>`;
            break;
        case '/about':
            pageTitle = 'About Us';
            contentHTML = `<h1>${pageTitle}</h1><p>${aboutModule.getAboutContent(visitorName)}</p>`;
            break;
        case '/contact':
            pageTitle = 'Contact Information';
            contentHTML = `<h1>${pageTitle}</h1><p>${contactModule.getContactContent(visitorName)}</p>`;
            break;
        case '/gallery':
            pageTitle = 'Gallery';
            contentHTML = `<h1>${pageTitle}</h1><p>${galleryModule.getGalleryContent()}</p>`;
            break;
        default:
            responseCode = 404;
            pageTitle = 'Page Not Found';
            contentHTML = `<h1>${pageTitle}</h1><p>${notFoundModule.getNonFoundContent()}</p>`;
            break;
    }

    response.writeHead(responseCode, { 'Content-Type': 'text/html' });
    response.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>${pageTitle}</title>
        </head>
        <body>
            ${contentHTML}
            ${footerModule.getFooterContent()}
        </body>
        </html>
    `);
    response.end();
});

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}/`);
});
