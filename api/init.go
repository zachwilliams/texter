package api

import (
	"github.com/gin-gonic/gin"
	"github.com/zachwilliams/texter/core"
)

func init() {
	g := core.API.Group("")

	// g.Use(core.UserMiddleware)
	// no auth Middlewares implelmented yet

	g.GET("/healthcheck/", healthCheck)
	g.GET("/articles/", listArticles)

	// g.Use(org.MustUserMiddleware)
	// g.POST("/articles", createArticles)
	// g.DELETE("/articles/:id", deleteArticles)
}

func healthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "Not Broken...",
	})
}
