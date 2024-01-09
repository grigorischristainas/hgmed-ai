import Skeleton from 'react-loading-skeleton'
import {
    StyledDiseaseIcon,
    StyledEffectivenessIcon,
    StyledInterventionIcon,
    StyledSkeletonIconContainer,
    StyledSectionContainer,
} from './SummaryContentStyles'
import { SummaryContentProps } from './types'

const SummaryContent = ({ loading, data }: SummaryContentProps) => {
    const disease = data?._items[0].disease
    const intervention = data?._items[0].intervention
    const effectiveness = data?._items[0].effectiveness

    return (
        <>
            <StyledSectionContainer>
                {loading ? (
                    <>
                        <StyledSkeletonIconContainer>
                            <Skeleton circle containerClassName="skeleton" />
                        </StyledSkeletonIconContainer>
                        <Skeleton containerClassName="skeleton" />
                    </>
                ) : (
                    <>
                        <StyledDiseaseIcon />
                        <div>{disease}</div>
                    </>
                )}
            </StyledSectionContainer>

            <StyledSectionContainer>
                {loading ? (
                    <>
                        <StyledSkeletonIconContainer>
                            <Skeleton circle containerClassName="skeleton" />
                        </StyledSkeletonIconContainer>
                        <Skeleton containerClassName="skeleton" />
                    </>
                ) : (
                    <>
                        <StyledInterventionIcon />
                        <div>{intervention}</div>
                    </>
                )}
            </StyledSectionContainer>

            <StyledSectionContainer>
                {loading ? (
                    <>
                        <StyledSkeletonIconContainer>
                            <Skeleton circle containerClassName="skeleton" />
                        </StyledSkeletonIconContainer>
                        <Skeleton containerClassName="skeleton" />
                    </>
                ) : (
                    <>
                        <StyledEffectivenessIcon />
                        <div>{effectiveness}</div>
                    </>
                )}
            </StyledSectionContainer>
        </>
    )
}

export default SummaryContent
