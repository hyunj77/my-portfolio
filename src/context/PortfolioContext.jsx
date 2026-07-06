import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { initialAboutMeData } from '../data/aboutMeData.js'
import { getSkillsSortedByLevel, initialSkillsData } from '../data/skillsData.js'

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [aboutMeData, setAboutMeData] = useState({
    ...initialAboutMeData,
    skills: initialSkillsData,
  })

  const updateSectionContent = useCallback((sectionId, content) => {
    setAboutMeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, content } : section,
      ),
    }))
  }, [])

  const updateSkillLevel = useCallback((skillId, level) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === skillId ? { ...skill, level } : skill)),
    }))
  }, [])

  const addSkill = useCallback((skill) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        { ...skill, id: prev.skills.length ? Math.max(...prev.skills.map((s) => s.id)) + 1 : 1 },
      ],
    }))
  }, [])

  const getHomeData = useCallback(() => {
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

  const homeData = useMemo(() => getHomeData(), [getHomeData])

  const value = useMemo(
    () => ({
      aboutMeData,
      setAboutMeData,
      updateSectionContent,
      updateSkillLevel,
      addSkill,
      getHomeData,
      homeData,
    }),
    [aboutMeData, updateSectionContent, updateSkillLevel, addSkill, getHomeData, homeData],
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio은 PortfolioProvider 내부에서만 사용할 수 있습니다.')
  }
  return context
}
