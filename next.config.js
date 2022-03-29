const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  async redirects() {
    return [
      {
        source: '/post/best-packages-in-chittagongchattogram',
        destination: '/post/best-packages-in-chittagong',
        permanent: true
      },
      {
        source: '/post/best-hotels-in-chittagongchattogram',
        destination: '/post/best-hotels-in-chittagong',
        permanent: true
      },
      {
        source: '/post/a-short-story-behind-sairu-hill',
        destination: '/post/sairu-hill-bandarban',
        permanent: true
      },
      {
        source: '/post/day-trip-to-chandranath-hill-sitakunda-from-chattogram',
        destination: '/post/day-trip-to-chandranath-hill-sitakunda-from-chittagong',
        permanent: true
      },
      {
        source: '/post/best-places-to-visit-in-jessore-jashore-travel-guide-2021',
        destination: '/post/travel-guide-best-places-to-visit-in-jessore',
        permanent: true
      },
      {
        source: '/post/best-flights-from-dhaka-to-jessore-dhaka-to-jessore-air-ticket-price',
        destination: '/post/best-flights-from-dhaka-to-jessore',
        permanent: true
      },
      {
        source: '/post/best-flights-from-dhaka-to-sylhet-how-to-book-dhaka-to-sylhet-flights',
        destination: '/post/best-flights-from-dhaka-to-sylhet',
        permanent: true
      },
      {
        source: '/post/the-origin-of-rickshaw-paintings',
        destination: '/post/bangladeshi-rickshaws',
        permanent: true
      },
      {
        source: '/post/top-five-hotels-in-kuakata',
        destination: '/post/kuakata-hotels',
        permanent: true
      },
      {
        source: '/post/safety-measures-while-taking-domestic-flights',
        destination: '/post/domestic-flights',
        permanent: true
      },
      {
        source: '/post/mawa--the-epitome-of-development',
        destination: '/post/mawa',
        permanent: true
      },
      {
        source: '/post/lets-explore-shagor-kannya---kuakata',
        destination: '/post/kuakata',
        permanent: true
      },
      {
        source: '/post/a-place-where-you-can-breathenilgiri',
        destination: '/post/places-to-visit-in-nilgiri-bandarban',
        permanent: true
      },
      {
        source: '/post/top-five-places-to-visit-in-maldives',
        destination: '/post/places-to-visit-in-maldives',
        permanent: true
      },
      {
        source: '/post/day-trip-to-chandranath-hill-sitakunda-from-chattogram',
        destination: '/post/day-trip-to-chandranath-hill-sitakunda-from-chittagong',
        permanent: true
      },
      {
        source: '/post/short-weekend-trips-to-cope-with-busy-city-life',
        destination: '/post/weekend-trips',
        permanent: true
      },
      {
        source:
          '/post/procedures-for-institutional-quarantine-for-passengers-traveling-to-the-kingdom-of-saudi-arabia',
        destination: '/post/quarantine-for-passengers-traveling-to-the-kingdom-of-saudi-arabia',
        permanent: true
      },
      {
        source: '/post/best-flights-from-dhaka-to-sylhet-how-to-book-dhaka-to-sylhet-flights',
        destination: '/post/best-flights-from-dhaka-to-sylhet',
        permanent: true
      }
    ];
  }
};
