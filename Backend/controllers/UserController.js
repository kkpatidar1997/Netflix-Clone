const User = require("../models/UserModel")

module.exports.addToLikedMovies = async(req,res) => {
    try {
        const {email,data} = req.body;
        const user = await User.findOne({email});
        if(user)
        {
            const {likedMovies} = user;
            const movieAlreadyLiked = likedMovies.find(({id}) => (id===data.id))
            if(!movieAlreadyLiked)
            {
                await User.findByIdAndUpdate(
                    user.id,
                    {
                        likedMovies: [...user.likedMovies, data],
                    },
                    {new: true}
                );
            }
            else return res.json({msg: "Movie already added to the list."})
        }
        else await User.create({email, likedMovies: [data]});
        return res.json({msg: "Movie added successfully"})
    } catch (error) {
        return res.json({msg: "Error adding movie"});
    }
};

module.exports.getLikedMovies = async(req,res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({email});
        if(user)
        {
            res.json({msg: "Success", movies: user.likedMovies})
        }
        else
        {
            return res.json({msg: "User with given email not found"})
        }
    } catch (error) {
        return res.json({msg: "Error fetching movie"});
    }
}


module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex((movie) => movie.id === movieId);

      if (movieIndex === -1) {
        return res.status(400).json({ msg: "Movie not found." });
      }

      movies.splice(movieIndex, 1);
      user.likedMovies = movies;
      await user.save();

      return res.json({ msg: "Movie successfully removed.", movies });
    } else {
      return res.json({ msg: "User with the given email not found." });
    }
  } catch (error) {
    console.error("Error removing movie from the liked list:", error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};
