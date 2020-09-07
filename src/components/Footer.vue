<template>
    <!--    todo currently temp logos-->
    <div class="footer" >
        <div class="w-100" id="footer">
            <div class="w-100 footer-container">
                <div class="footer-logo" >
                    <b-img fluid id="nexus" alt="Nexus Logo" src="../assets/nexuslogoBW.png"></b-img>
                </div>
                <div class="footer-logo" >
                    <b-img fluid id="stadler" alt="Stadler Logo" src="../assets/stadlerLogoBW.svg"></b-img>
                </div>
                <div class="footer-logo footer-center-left">
                    <div class="test">
                    <p><a href="#" v-b-modal.privacy-modal>Privacy Policy</a></p>
                    </div>
                </div>
                <div class="footer-logo footer-center-right">
                    <p><a href="#" v-b-modal.terms-modal>Terms &amp; Conditions</a></p>
                </div>
                <div class="footer-logo footer-openlab" id="lab">
                    <p>Powered by <b-img fluid alt="Open Lab Logo" src="../assets/openLabTemp.png"></b-img></p>
                </div>
            </div>
        </div>
        <!-- Compontents for modals -->
        <Privacy/>
        <Terms/>
    </div>

</template>

<script>
    import Privacy from "@/components/Privacy";
    import Terms from "@/components/Terms";

    export default {
        name: 'Footer',
        components: {
            Privacy,
            Terms
        }
    }
</script>

<style scoped lang="scss">
    .footer {
        position: relative;
    }
    #stadler-logo {
        padding-left: 0.5em;
    }
    #nexus{
        max-width: 50%;
    }
    #stadler {
        max-width: 70%;
    }
    #lab {
        margin-top: auto;
        margin-bottom: auto;
        & img {
            padding-bottom: 0.3em;
            padding-left: 0.4em;
        }

        & p {
            color: black;
        }

    }


p {
     margin: 0;
        font-family: "Open Sans", Arial,serif;
        font-size: small;
}
.footer-container {
    display: flex;
    flex-direction: row;
    
    .footer-logo {
        margin-top: auto;
        margin-bottom: auto;
        flex: 1;
        a {
            color: black;
        }
    }

    .footer-center-left {
        p{
            text-align: right;
            padding-right: 5%;
            
        }
        div {
            border-right: 2px solid #FEC600;
        }
    }

    .footer-center-right {
        p{
            padding-left: 5%;
        }
    }

    .footer-openlab {
        p{
            text-align: right;
        }
    }
}
    
      
@media all and (max-width:800px) //800px for tablets and phones.
{
    .footer-container {
        flex-direction: column;
        .footer-logo {
            width:100%;
            text-align: center;
            p{
                text-align: center;
                padding: 0%;
            }   
            div {
            border: none;
        }
        }
    }

    #nexus{
        max-width: 20%;
    }
    #stadler {
        max-width: 25%;
    }
}

</style>
