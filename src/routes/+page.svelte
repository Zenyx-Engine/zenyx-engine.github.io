<!-- src/routes/+page.svelte -->
<script>
    import Bento from "$lib/components/elements/Bento.svelte";
import Hero from "$lib/components/elements/Hero.svelte";

const features = [
    // Row 1 - Main features (large cards)
    {
        title: "Universal Deployment",
        description: "Deploy seamlessly across public clouds, private infrastructure, or hybrid environments. Support for all major cloud providers and on-premises solutions.",
        area: "feat1",
        className: "lg:col-span-2"
    },

    {
        title: "Lightning Fast Performance",
        description: "Optimized build and deployment pipeline delivers maximum speed and efficiency.",
        area: "feat3",
        className: "lg:col-span-1"
    },
    {
        title: "Advanced CLI Tools",
        description: "Powerful command-line interface enables streamlined workflows and automation.",
        area: "feat4",
        className: "lg:col-span-1"
    },
    {
        title: "GitOps Ready",
        description: "Native support for GitOps workflows and CI/CD integration with version control systems.",
        area: "feat5",
        className: "lg:col-span-1"
    },
    // Row 3 - Infrastructure features (medium cards)
    {
        title: "Service Mesh Integration",
        description: "Built-in service mesh provides advanced networking, traffic management, and observability. Support for Istio, Linkerd, and custom implementations.",
        area: "feat6",
        className: "lg:col-span-1"
    },
    {
        title: "Container Orchestration",
        description: "Advanced container orchestration with support for Kubernetes, Docker Swarm, and custom schedulers.",
        area: "feat7",
        className: "lg:col-span-1"
    },
    // Row 4 - Operations features
    {
        title: "Real-time Monitoring",
        description: "Comprehensive monitoring and alerting capabilities with custom dashboards.",
        area: "feat8",
        className: "lg:col-span-1"
    },
    {
        title: "Automated Operations",
        description: "Automate routine operations with self-healing infrastructure and predictive scaling.",
        area: "feat9",
        className: "lg:col-span-1"
    }
];


</script>

<Hero />
<div id="target">
<Bento/>
</div>
<style>
    html {
        scroll-behavior: smooth;
    }
</style>