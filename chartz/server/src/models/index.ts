import { sequelize } from "sequelize";
import { UserFactory } from "./user";
import { SavedSongFactory } from "./savedSong";

const UserModel = UserFactory(sequelize);

const SavedSongModel = SavedSongFactory(sequelize);

export { UserModel, SavedSongModel };