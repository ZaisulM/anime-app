// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./app.css"; // Import the CSS file for styling

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAnime = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/top/anime?page=${page}`,
      );
      setAnimeList(response.data.data);
      setTotalPages(response.data.pagination.last_visible_page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching anime list:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime(currentPage);
  }, [currentPage]);

  const searchAnime = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=10`,
      );
      setAnimeList(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error searching anime:", error);
      setLoading(false);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleAnimeClick = (anime) => {
    setSelectedAnime(anime);
  };

  const handleBackToList = () => {
    setSelectedAnime(null);
  };

  return (
    <div className="anime">
      <h1>Top Anime List</h1>
      <h3>Search for Anime</h3>

      {/* Search Form */}
      <form
        onSubmit={searchAnime}
        className="search-form">
        <input
          type="text"
          placeholder="Search anime..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          type="submit"
          className="search-button">
          Search
        </button>
      </form>

      {/* Back Button */}
      {selectedAnime && (
        <div className="back-button-container">
          <button
            onClick={handleBackToList}
            className="back-button">
            Back to List
          </button>
        </div>
      )}

      {/* Anime Detail View */}
      {selectedAnime ? (
        <div className="anime-details-container">
          <div className="anime-image-container">
            <img
              src={selectedAnime.images.jpg.image_url}
              alt={selectedAnime.title}
              className="anime-image"
            />
          </div>
          <div className="anime-details">
            <div className="anime-info">
              <h2>{selectedAnime.title}</h2>
              <p className="synopsis">{selectedAnime.synopsis}</p>
            </div>
            <div className="anime-score">
              <p>
                <strong>Score:</strong> <span>{selectedAnime.score}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <div className="anime-list">
                {animeList.map((anime) => (
                  <div
                    key={anime.mal_id}
                    className="anime-item"
                    onClick={() => handleAnimeClick(anime)}>
                    <img
                      src={anime.images.jpg.image_url}
                      alt={anime.title}
                      className="anime-thumbnail"
                    />
                    <h3>{anime.title}</h3>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="pagination">
                <button
                  onClick={() => handlePageChange("prev")}
                  disabled={currentPage === 1}
                  className="pagination-button">
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange("next")}
                  disabled={currentPage === totalPages}
                  className="pagination-button">
                  Next
                </button>
                <p className="page-info">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      <footer>
        <div className="credit">
          <p>
            Created By <a href="https://bio.link/zaisulmu">ZaisulMuttabi</a>. |
            &copy; 2024.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AnimeList;
