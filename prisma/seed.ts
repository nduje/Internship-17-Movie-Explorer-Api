import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const movies = [
  {
    title: 'Inception',
    poster: '/src/assets/images/posters/inception.webp',
    rating: 8.8,
    year: 2010,
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    director: 'Christopher Nolan',
    actors: [
      'Leonardo DiCaprio',
      'Joseph Gordon-Levitt',
      'Elliot Page',
      'Tom Hardy',
    ],
    plot: "A skilled thief is given a chance at redemption if he can successfully perform inception—planting an idea into a target's subconscious.",
  },
  {
    title: 'Interstellar',
    poster: '/src/assets/images/posters/interstellar.webp',
    rating: 8.7,
    year: 2014,
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    director: 'Christopher Nolan',
    actors: [
      'Matthew McConaughey',
      'Anne Hathaway',
      'Jessica Chastain',
      'Michael Caine',
    ],
    plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    title: 'The Dark Knight',
    poster: '/src/assets/images/posters/the_dark_knight.webp',
    rating: 9.1,
    year: 2008,
    genres: ['Action', 'Crime', 'Drama'],
    director: 'Christopher Nolan',
    actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Gary Oldman'],
    plot: 'Batman faces the Joker, a criminal mastermind who plunges Gotham City into chaos.',
  },
  {
    title: 'Pulp Fiction',
    poster: '/src/assets/images/posters/pulp_fiction.webp',
    rating: 8.8,
    year: 1994,
    genres: ['Crime', 'Drama'],
    director: 'Quentin Tarantino',
    actors: [
      'John Travolta',
      'Uma Thurman',
      'Samuel L. Jackson',
      'Bruce Willis',
    ],
    plot: 'The lives of two mob hitmen, a boxer, and others intertwine in a series of violent and darkly comedic stories.',
  },
  {
    title: 'The Matrix',
    poster: '/src/assets/images/posters/the_matrix.webp',
    rating: 8.7,
    year: 1999,
    genres: ['Action', 'Sci-Fi'],
    director: 'Lana Wachowski, Lilly Wachowski',
    actors: [
      'Keanu Reeves',
      'Laurence Fishburne',
      'Carrie-Anne Moss',
      'Hugo Weaving',
    ],
    plot: 'A hacker discovers that reality is a simulated world and joins a rebellion against the machines.',
  },
  {
    title: 'Fight Club',
    poster: '/src/assets/images/posters/fight_club.webp',
    rating: 8.8,
    year: 1999,
    genres: ['Drama'],
    director: 'David Fincher',
    actors: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter', 'Meat Loaf'],
    plot: 'An insomniac office worker forms an underground fight club that evolves into something far more dangerous.',
  },
  {
    title: 'Forrest Gump',
    poster: '/src/assets/images/posters/forrest_gump.webp',
    rating: 8.8,
    year: 1994,
    genres: ['Drama', 'Romance'],
    director: 'Robert Zemeckis',
    actors: ['Tom Hanks', 'Robin Wright', 'Gary Sinise', 'Sally Field'],
    plot: 'The life journey of a kind-hearted man who unwittingly influences several historical events.',
  },
  {
    title: 'The Shawshank Redemption',
    poster: '/src/assets/images/posters/the_shawshank_redemption.webp',
    rating: 9.3,
    year: 1994,
    genres: ['Drama'],
    director: 'Frank Darabont',
    actors: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler'],
    plot: 'Two imprisoned men bond over years, finding solace and eventual redemption through acts of decency.',
  },
  {
    title: 'Gladiator',
    poster: '/src/assets/images/posters/gladiator.webp',
    rating: 8.5,
    year: 2000,
    genres: ['Action', 'Adventure', 'Drama'],
    director: 'Ridley Scott',
    actors: [
      'Russell Crowe',
      'Joaquin Phoenix',
      'Connie Nielsen',
      'Oliver Reed',
    ],
    plot: 'A former Roman general seeks revenge against the corrupt emperor who murdered his family.',
  },
  {
    title: 'Titanic',
    poster: '/src/assets/images/posters/titanic.webp',
    rating: 8.0,
    year: 1997,
    genres: ['Drama', 'Romance'],
    director: 'James Cameron',
    actors: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane', 'Kathy Bates'],
    plot: 'A young couple from different social classes fall in love aboard the ill-fated RMS Titanic.',
  },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    poster: '/src/assets/images/posters/the_lord_of_the_rings.webp',
    rating: 8.9,
    year: 2001,
    genres: ['Adventure', 'Drama', 'Fantasy'],
    director: 'Peter Jackson',
    actors: ['Elijah Wood', 'Ian McKellen', 'Viggo Mortensen', 'Orlando Bloom'],
    plot: 'A meek Hobbit and his companions set out on a journey to destroy a powerful ring.',
  },
  {
    title: 'The Godfather',
    poster: '/src/assets/images/posters/the_godfather.webp',
    rating: 9.2,
    year: 1972,
    genres: ['Crime', 'Drama'],
    director: 'Francis Ford Coppola',
    actors: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Diane Keaton'],
    plot: 'The aging patriarch of a crime dynasty transfers control of his empire to his reluctant son.',
  },
  {
    title: 'The Social Network',
    poster: '/src/assets/images/posters/the_social_network.webp',
    rating: 7.8,
    year: 2010,
    genres: ['Biography', 'Drama'],
    director: 'David Fincher',
    actors: [
      'Jesse Eisenberg',
      'Andrew Garfield',
      'Justin Timberlake',
      'Rooney Mara',
    ],
    plot: 'The story of the founding of Facebook and the lawsuits that followed.',
  },
  {
    title: 'Whiplash',
    poster: '/src/assets/images/posters/whiplash.webp',
    rating: 8.5,
    year: 2014,
    genres: ['Drama', 'Music'],
    director: 'Damien Chazelle',
    actors: ['Miles Teller', 'J.K. Simmons', 'Paul Reiser', 'Melissa Benoist'],
    plot: 'A young drummer enrolls in a cut-throat music conservatory led by a ruthless instructor.',
  },
  {
    title: 'The Prestige',
    poster: '/src/assets/images/posters/the_prestige.webp',
    rating: 8.5,
    year: 2006,
    genres: ['Drama', 'Mystery', 'Sci-Fi'],
    director: 'Christopher Nolan',
    actors: [
      'Christian Bale',
      'Hugh Jackman',
      'Scarlett Johansson',
      'Michael Caine',
    ],
    plot: 'Two rival magicians engage in a bitter battle to create the ultimate stage illusion.',
  },
  {
    title: 'Parasite',
    poster: '/src/assets/images/posters/parasite.webp',
    rating: 8.5,
    year: 2019,
    genres: ['Drama', 'Thriller'],
    director: 'Bong Joon Ho',
    actors: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik'],
    plot: 'Greed and class discrimination threaten a newly formed symbiotic relationship between two families.',
  },
  {
    title: 'Joker',
    poster: '/src/assets/images/posters/joker.webp',
    rating: 8.3,
    year: 2019,
    genres: ['Crime', 'Drama', 'Thriller'],
    director: 'Todd Phillips',
    actors: [
      'Joaquin Phoenix',
      'Robert De Niro',
      'Zazie Beetz',
      'Frances Conroy',
    ],
    plot: 'A mentally troubled comedian descends into madness and becomes the criminal mastermind known as the Joker.',
  },
  {
    title: 'Avengers: Endgame',
    poster: '/src/assets/images/posters/avengers_endgame.webp',
    rating: 8.4,
    year: 2019,
    genres: ['Action', 'Adventure', 'Drama'],
    director: 'Anthony Russo, Joe Russo',
    actors: [
      'Robert Downey Jr.',
      'Chris Evans',
      'Mark Ruffalo',
      'Chris Hemsworth',
    ],
    plot: 'The Avengers assemble once more to reverse the damage caused by Thanos.',
  },
  {
    title: 'The Silence of the Lambs',
    poster: '/src/assets/images/posters/the_silence_of_the_lambs.webp',
    rating: 8.6,
    year: 1991,
    genres: ['Crime', 'Drama', 'Thriller'],
    director: 'Jonathan Demme',
    actors: ['Jodie Foster', 'Anthony Hopkins', 'Scott Glenn', 'Ted Levine'],
    plot: 'A young FBI cadet seeks the help of an incarcerated cannibal to catch another serial killer.',
  },
  {
    title: 'Django Unchained',
    poster: '/src/assets/images/posters/django_unchained.webp',
    rating: 8.5,
    year: 2012,
    genres: ['Drama', 'Western'],
    director: 'Quentin Tarantino',
    actors: [
      'Jamie Foxx',
      'Christoph Waltz',
      'Leonardo DiCaprio',
      'Kerry Washington',
    ],
    plot: 'With the help of a bounty hunter, a freed slave sets out to rescue his wife from a brutal plantation owner.',
  },
];

async function main() {
  for (const movie of movies) {
    const genreConnections: { id: number }[] = [];

    for (const genreName of movie.genres) {
      const genre = await prisma.genre.upsert({
        where: { name: genreName },
        update: {},
        create: { name: genreName },
      });

      genreConnections.push({ id: genre.id });
    }

    await prisma.movie.upsert({
      where: { title: movie.title },
      update: {},
      create: {
        title: movie.title,
        poster: movie.poster,
        rating: movie.rating,
        year: movie.year,
        director: movie.director,
        actors: movie.actors,
        plot: movie.plot,
        genres: {
          connect: genreConnections,
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
