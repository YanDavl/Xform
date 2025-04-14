package middlewares

import (
	"net/http"
	"os"
)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("session")
		if err != nil || cookie == nil || cookie.Value == "" {
			http.Error(w, "Unauthorized: no session", http.StatusUnauthorized)
			return
		}

		verifyURL := os.Getenv("AUTH_VERIFY_URL")
		if verifyURL == "" {
			verifyURL = "http://localhost:4000/auth/verify-session"
		}

		req, err := http.NewRequest("GET", verifyURL, nil)
		if err != nil {
			http.Error(w, "Internal error", http.StatusInternalServerError)
			return
		}

		req.Header.Set("Cookie", r.Header.Get("Cookie"))

		client := &http.Client{}
		resp, err := client.Do(req)

		if err != nil || resp.StatusCode != http.StatusOK {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}
