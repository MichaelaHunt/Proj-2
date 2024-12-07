import sequelize from "../config/connection.js";
import { UserFactory } from "./user.js";
import { SavedSongFactory } from "./savedSong.js";

const UserModel = UserFactory(sequelize);

const SavedSongModel = SavedSongFactory(sequelize);

// Define the tables 
const UserSavedSong = sequelize.define('UserSavedSong', {}, { timestamps: false, tableName: 'userSavedSongs' });

//set up associations
UserModel.belongsToMany(SavedSongModel, { through: UserSavedSong, foreignKey: 'userId' });
SavedSongModel.belongsToMany(UserModel, { through: UserSavedSong, foreignKey: 'SavedSongId' });

export { UserModel, SavedSongModel, UserSavedSong };