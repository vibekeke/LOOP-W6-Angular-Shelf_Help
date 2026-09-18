# ShelfHelp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


```mermaid
flowchart TD
    App --> Header
    App --> Routes

    Routes --> Landing["Landing (/)"]
    Routes --> Login["Login (/login)"]
    Routes --> BookCatalogue["BookCatalogue (/book-catalogue)"]
    Routes --> ReadingList["ReadingList (/reading-list)"]
    Routes --> BookDetails["BookDetails (/book-details/:id)"]

    Landing --> WelcomeCard
    Login --> LoginCard

    BookCatalogue --> BookCatalogueHeading
    BookCatalogue --> BookCard

    ReadingList --> ReadingListHeading
    ReadingList --> ReadListEntry

    BookDetails --> BookDetailsCard
```