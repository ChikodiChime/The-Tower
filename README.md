# Apartment Towers Visualization App

This web application provides an interactive visualization of multiple apartment towers, their floors, and available unit layouts. Users can explore different towers, view detailed information about each floor, and inspect apartment/unit layouts, including images, features, and occupancy data.

## Features
- **Tower Overview:** Browse a list of apartment towers with visual representations and key stats.
- **Floor Navigation:** Drill down into each tower to view its floors and occupancy information.
- **Unit Layouts:** Explore available apartment layouts on each floor, including images, room/bath counts, and descriptions.
- **Interactive Tooltips:** Hover on floors to see tooltips that adjust position to avoid screen overflow.
- **Filtering:** Filter apartment layouts by room count, bath count, area, and balcony availability.
- **Modern UI:** Responsive design with smooth animations and a visually appealing theme.

## Tools & Libraries Used
- **[Next.js](https://nextjs.org/):** React framework for server/client rendering and routing.
- **React 19:** Core UI library.
- **TypeScript:** Type safety and improved developer experience.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Framer Motion:** Animation library for React components.
- **Lucide-React:** Icon library for modern SVG icons.
- **Swiper:** Carousel/slider for apartment images.
- **rc-slider / react-range-slider-input:** Range sliders for filtering apartments.
- **nextjs-toploader:** Progress bar for page transitions.

## Known Limitations & Tradeoffs
- **Dummy Data:** The app currently uses static/dummy data for towers, floors, and layouts. No backend or live data integration.
- **Tooltip Positioning:** Tooltips attempt to avoid overflow, but may still overlap in rare edge cases or on very small screens.
- **Mobile Experience:** While responsive, some advanced interactions are best experienced on desktop.

## Getting Started
To run locally:
```bash
npm install
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

## License
This project is for demonstration and educational purposes.
