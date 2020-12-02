package api

import (
	"github.com/gin-gonic/gin"
	"github.com/zachwilliams/saasjaz/core"
)

func init() {
	g := core.API.Group("")

	g.GET("/healthcheck/", healthCheck)
	g.GET("/articles/", listArticles)
	g.POST("/login", login)
}

func healthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "Not Broken...",
	})
}

func login(c *gin.Context) {
	// TODO call actual auth code
	username := c.PostForm("username")
	password := c.PostForm("password")

	if username == "guy" && password == "test" {
		c.JSON(200, gin.H{
			"status": "success",
			"token":  "Q1238TFS89SFA42KASD3LFEIV3AS",
		})
	} else {
		c.JSON(403, gin.H{
			"status": "forbidden",
		})

	}
}
