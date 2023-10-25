package main

import (
	"encoding/json"
	"fmt"
	"io"
	"math/rand"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

var db = map[string]string{}

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Post("/", shortenUrl)
	r.Get("/{shortUrl}", getUrl)
	http.ListenAndServe(":3000", r)
}

type postRequest struct {
	Url string `json:"url"`
}

func shortenUrl(w http.ResponseWriter, r *http.Request) {
	jsonData, _ := io.ReadAll(r.Body)
	var url postRequest
	_ = json.Unmarshal(jsonData, &url)
	shortUrl := randStringBytes(6)
	db[shortUrl] = url.Url
	json.NewEncoder(w).Encode(shortUrl)
	fmt.Println(db)
}

func getUrl(w http.ResponseWriter, r *http.Request) {
	shortUrl := chi.URLParam(r, "shortUrl")
	fmt.Println(shortUrl)
	longUrl := db[shortUrl]
	http.Redirect(w, r, longUrl, http.StatusMovedPermanently)
}

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func randStringBytes(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}
