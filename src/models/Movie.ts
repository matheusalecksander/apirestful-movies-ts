import { model, Schema } from "mongoose";

// Schema do nosso DB
const movieSchema = new Schema(
  {
    title: { type: String },
    rating: { type: Number },
    description: { type: String },
    director: { type: String },
    stars: { type: Array },
    poster: { type: String },
  },
  {
    timestamps: true,
  }
);

// Exportando nosso model para podermos realizar as alterações no DB
export const MovieModel = model("Movie", movieSchema);
