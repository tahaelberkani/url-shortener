package main

import "math/rand"

type service struct {
	rep Repository
}

func NewService(port Repository) Handeler {
	return &service{
		rep: port,
	}
}

type Repository interface {
	postUrlShortend(shortUrl string, longUrl string) error
	getLongUrl(shortUrl string) (longUrl string, err error)
}

type Handeler interface {
	shortendUrl(longUrl string) (shortUrl string, err error)
	getLongUrl(shortUrl string) (longUrl string, err error)
}

func (s *service) shortendUrl(longUrl string) (shortUrl string, err error) {
	shortUrl = randStringBytes(6)
	s.rep.postUrlShortend(shortUrl, longUrl)
	return shortUrl, nil
}

func (s *service) getLongUrl(shortUrl string) (longUrl string, err error) {
	longUrl, _ = s.rep.getLongUrl(shortUrl)
	return longUrl, nil
}

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func randStringBytes(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}
