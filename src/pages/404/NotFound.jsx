import { Box, Button, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  useEffect(() => {
    const loadParticles = async () => {
      await loadScript('https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js')

      if (window.tsParticles) {
        window.tsParticles.load('tsparticles', {
          fullScreen: { enable: true },
          fpsLimit: 60,
          particles: {
            number: { value: 150 },
            color: { value: '#fff' },
            shape: { type: 'circle' },
            opacity: { value: 1 },
            size: { value: 3 },
            move: {
              enable: true,
              speed: 5,
              direction: 'right',
              straight: true,
              outModes: { default: 'out' }
            }
          },
          background: { color: '#000' },
          emitters: {
            position: { y: 55, x: -30 },
            rate: { delay: 7, quantity: 1 },
            size: { width: 0, height: 0 },
            particles: {
              shape: {
                type: 'images',
                options: {
                  images: [
                    { src: 'https://particles.js.org/images/amongus_blue.png', width: 205, height: 267 },
                    { src: 'https://particles.js.org/images/amongus_cyan.png', width: 207, height: 265 },
                    { src: 'https://particles.js.org/images/amongus_green.png', width: 204, height: 266 },
                    { src: 'https://particles.js.org/images/amongus_lime.png', width: 206, height: 267 },
                    { src: 'https://particles.js.org/images/amongus_orange.png', width: 205, height: 265 },
                    { src: 'https://particles.js.org/images/amongus_pink.png', width: 205, height: 265 },
                    { src: 'https://particles.js.org/images/amongus_red.png', width: 204, height: 267 },
                    { src: 'https://particles.js.org/images/amongus_white.png', width: 205, height: 267 }
                  ]
                }
              },
              size: { value: 40 },
              move: {
                speed: 10,
                straight: true,
                outModes: {
                  default: 'destroy',
                  left: 'none'
                }
              },
              zIndex: { value: 0 },
              rotate: {
                value: { min: 0, max: 360 },
                animation: { enable: true, speed: 10, sync: true }
              }
            }
          }

        })
      }
    }

    loadParticles()
  }, [])

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.async = true
      script.onload = resolve
      document.body.appendChild(script)
    })

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: 16, position: 'relative', zIndex: 1, textAlign: 'center', gap: 1.5
    }}>
      <Box id='tsparticles' sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></Box>
      <Typography variant='h1' sx={{ position: 'relative', color: 'error.main', fontWeight: 'bold' }} >404 Not Found</Typography>
      <Typography variant='h4' sx={{ position: 'relative', color: '#fff' }} >Maybe you&#39;re lost or you are an imposter👻</Typography>
      <Link to={'/'}>
        <Button variant='contained' sx={{ position: 'relative' }}>Go Home</Button>
      </Link>
    </Box>
  )
}

export default NotFound
