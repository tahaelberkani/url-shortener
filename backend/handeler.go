package main

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

type chiHttpServer struct {
	serv service
}

func NewChiHttpServer(s service) *chiHttpServer {
	return &chiHttpServer{
		serv: s,
	}
}

func (h *chiHttpServer) Run() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Post("/", h.shortenUrl)
	r.Get("/{shortUrl}", h.getUrl)
	http.ListenAndServe(":3000", r)
}

func (s *chiHttpServer) shortenUrl(w http.ResponseWriter, r *http.Request) {
	jsonData, _ := io.ReadAll(r.Body)
	var url string
	_ = json.Unmarshal(jsonData, &url)
	shortUrl, _ := s.serv.shortendUrl(url)
	json.NewEncoder(w).Encode(shortUrl)
}

func (s *chiHttpServer) getUrl(w http.ResponseWriter, r *http.Request) {
	shortUrl := chi.URLParam(r, "shortUrl")
	s.serv.rep.getLongUrl()
	w.Write([]byte("Hello World!"))
}
