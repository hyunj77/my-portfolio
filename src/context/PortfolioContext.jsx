import { createContext, useContext, useMemo } from 'react'
import { initialAboutMeData } from '../data/aboutMeData.js'
import { getSkillsSortedByLevel, initialSkillsData } from '../data/skillsData.js'

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const aboutMeData = useMemo(
    () => ({
      ...initialAboutMeData,
      skills: initialSkillsData,
    }),
    [],
  )

  const homeData = useMemo(() => {
    const homeContent = aboutMeData.sections
      .filter((section) => section.showInHome)
      .map((section) => ({
        id: section.id,
        title: section.title,
        summary: section.content.length > 100 ? `${section.content.slice(0, 100)}...` : section.content,
      }))

    const topSkills = getSkillsSortedByLevel(aboutMeData.skills).slice(0, 4)

    return { content: homeContent, skills: topSkills, basicInfo: aboutMeData.basicInfo }
  }, [aboutMeData])

  const value = useMemo(() => ({ aboutMeData, homeData }), [aboutMeData, homeData])

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio은 PortfolioProvider 내부에서만 사용할 수 있습니다.')
  }
  return context
}
