package api

import (
	"github.com/gin-gonic/gin"
	"github.com/zachwilliams/saasjaz/core"
)

func init() {
	g := core.API.Group("")

	g.GET("/healthcheck/", healthCheck)
	g.GET("/articles/", listArticles)
}

func healthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "Not Broken...",
	})
}
