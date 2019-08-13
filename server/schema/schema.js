const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// Dummy data:

// let books = [
//   { name: "Name of the Wind", genre: "Fantasy", id: "1", authorid: "1" },
//   { name: "The Final Empire", genre: "Fantasy", id: "2", authorid: "2" },
//   { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorid: "3" },
//   { name: "The Hero of Ages", genre: "Fantasy", id: "4", authorid: "2" },
//   { name: "The Colour of Magic", genre: "Fantasy", id: "5", authorid: "3" },
//   { name: "The Light Fantastic", genre: "Fantasy", id: "6", authorid: "3" }
// ];

// let authors = [
//   { name: "Patrick Rothfuss", age: 44, id: "1" },
//   { name: "Brandon Sanderson", age: 42, id: "2" },
//   { name: "Terry Pratchett", age: 66, id: "3" }
// ];

const owners = [
  {
    id: "1",
    firstName: "Steve",
    lastName: "Jobs"
  },
  {
    id: "2",
    firstName: "Elon",
    lastName: "Musk"
  },
  {
    id: "3",
    firstName: "Jeff",
    lastName: "Bezos"
  }
];

const cars = [
  {
    id: "1",
    year: "2019",
    make: "Toyota",
    model: "Supra",
    price: "60000",
    ownerId: "1"
  },
  {
    id: "2",
    year: "2003",
    make: "Honda",
    model: "Civic",
    price: "30000",
    ownerId: "1"
  },
  {
    id: "3",
    year: "1996",
    make: "Toyota",
    model: "4Runner",
    price: "40000",
    ownerId: "1"
  },
  {
    id: "4",
    year: "2015",
    make: "Tesla",
    model: "Model 3",
    price: "50000",
    ownerId: "2"
  },
  {
    id: "5",
    year: "2013",
    make: "Tesla",
    model: "Model S",
    price: "900000",
    ownerId: "2"
  },
  {
    id: "6",
    year: "2014",
    make: "Tesla",
    model: "Model X",
    price: "100000",
    ownerId: "2"
  },
  {
    id: "7",
    year: "2014",
    make: "McLaren ",
    model: "F1",
    price: "33000000",
    ownerId: "3"
  },
  {
    id: "8",
    year: "2005",
    make: "Lexus",
    model: "LFA",
    price: "495000",
    ownerId: "3"
  },
  {
    id: "9",
    year: "2012",
    make: "Mercedes",
    model: "GLK",
    price: "800000",
    ownerId: "3"
  }
];

// GraphQL object types:

const CarType = new GraphQLObjectType({
  name: "Car",
  fields: () => ({
    id: { type: GraphQLID },
    year: { type: GraphQLInt },
    make: { type: GraphQLString },
    model: { type: GraphQLString },
    price: { type: GraphQLInt },
    owner: {
      type: OwnerType,
      resolve(root, args) {
        return _.find(owners, { id: root.ownerId });
      }
    }
  })
});

const OwnerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    cars: {
      type: new GraphQLList(CarType),
      resolve(root, args) {
        return _.filter(cars, { ownerId: root.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    car: {
      type: CarType,
      args: { id: { type: GraphQLID } },
      resolve(root, args) {
        return _.find(cars, { id: args.id });
      }
    },
    owner: {
      type: OwnerType,
      args: { id: { type: GraphQLID } },
      resolve(root, args) {
        return _.find(owners, { id: args.id });
      }
    },
    cars: {
      type: new GraphQLList(CarType),
      resolve(root, args) {
        return cars;
      }
    },
    owners: {
      type: new GraphQLList(OwnerType),
      resolve(root, args) {
        return owners;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOwner: {
      type: OwnerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(root, args) {
        const newOwner = {
          firstName: args.firstName,
          lastName: args.lastName,
          id: args.id
        };
        owners.push(newOwner);
        return newOwner;
      }
    },
    addCar: {
      type: CarType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        year: { type: new GraphQLNonNull(GraphQLInt) },
        make: { type: new GraphQLNonNull(GraphQLString) },
        model: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        ownerId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(root, args) {
        const newCar = {
          year: args.year,
          make: args.make,
          model: args.model,
          price: args.price,
          ownerId: args.ownerId,
          id: args.id
        };
        cars.push(newCar);
        return newCar;
      }
    },
    updateOwner: {
      type: OwnerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(root, args) {
        const targetOwner = _.find(owners, { id: args.id });
        if (!targetOwner) {
          throw new Error(`Couldn't find owner with id:${args.id}`);
        }
        targetOwner.firstName = args.firstName ? args.firstName : targetOwner.firstName;
        targetOwner.lastName = args.lastName ? args.lastName : targetOwner.lastName;
        return targetOwner;
      }
    },
    updateCar: {
      type: CarType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        year: { type: new GraphQLNonNull(GraphQLInt) },
        make: { type: new GraphQLNonNull(GraphQLString) },
        model: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        ownerId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(root, args) {
        const targetCar = _.find(cars, { id: args.id });
        const targetOwner = _.find(owners, { id: args.id });
        if (!targetCar) {
          throw new Error(`Couldn't find car with id:${args.id}`);
        }
        targetCar.year = args.year ? args.year : targetCar.year;
        targetCar.make = args.make ? args.make : targetCar.make;
        targetCar.model = args.model ? args.model : targetCar.model;
        targetCar.price = args.price ? args.price : targetCar.price;
        targetCar.ownerId = args.ownerId ? args.ownerId : targetCar.ownerId;
        return targetCar;
      }
    },
    removeOwner: {
      type: OwnerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(root, args) {
        const targetOwner = _.find(owners, { id: args.id });
        if (!targetOwner) {
          throw new Error(`Couldn't find owner with id:${args.id}`);
        }
        _.remove(owners, { id: args.id });
        return targetOwner;
      }
    },
    removeCar: {
      type: CarType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(root, args) {
        const targetCar = _.find(cars, { id: args.id });
        if (!targetCar) {
          throw new Error(`Couldn't find car with id:${args.id}`);
        }
        _.remove(cars, { id: args.id });
        return targetCar;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
